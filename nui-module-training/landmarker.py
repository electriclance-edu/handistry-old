#----------IMPORTS------------#
import mediapipe as mp
import numpy as np
import cv2
import csv
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from PIL import Image
from mediapipe.framework.formats import landmark_pb2
from mediapipe import solutions

#----------WORLD OPTIONS------------#
BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode
debugging = False
visualizing = False
csv_generating = False
frame_generating = True

#----------CUSTOM UTILITY FUNCTIONS------------#
def draw_landmarks_on_image(rgb_image, detection_result):
    MARGIN = 10  # pixels
    FONT_SIZE = 1
    FONT_THICKNESS = 1
    HANDEDNESS_TEXT_COLOR = (88, 205, 54) # vibrant green
    hand_landmarks_list = detection_result.hand_landmarks
    handedness_list = detection_result.handedness
    annotated_image = np.copy(rgb_image)

    # Loop through the detected hands to visualize.
    for idx in range(len(hand_landmarks_list)):
        hand_landmarks = hand_landmarks_list[idx]
        handedness = handedness_list[idx]

        # Draw the hand landmarks.
        hand_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        hand_landmarks_proto.landmark.extend([
        landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in hand_landmarks
        ])
        solutions.drawing_utils.draw_landmarks(
        annotated_image,
        hand_landmarks_proto,
        solutions.hands.HAND_CONNECTIONS,
        solutions.drawing_styles.get_default_hand_landmarks_style(),
        solutions.drawing_styles.get_default_hand_connections_style())

        # Get the top left corner of the detected hand's bounding box.
        height, width, _ = annotated_image.shape
        x_coordinates = [landmark.x for landmark in hand_landmarks]
        y_coordinates = [landmark.y for landmark in hand_landmarks]
        text_x = int(min(x_coordinates) * width)
        text_y = int(min(y_coordinates) * height) - MARGIN

        # Draw handedness (left or right hand) on the image.
        cv2.putText(annotated_image, f"{handedness[0].category_name}",
                    (text_x, text_y), cv2.FONT_HERSHEY_DUPLEX,
                    FONT_SIZE, HANDEDNESS_TEXT_COLOR, FONT_THICKNESS, cv2.LINE_AA)

    return annotated_image

if debugging:
    if not os.path.exists('nui-module-training/hand_landmarker.task'):
        print('File does not exist')
    else:
        print("yes")

#----------CREATING HAND LANDMARKER INSTANCE (IMAGE MODE)------------#
options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path='nui-module-training/hand_landmarker.task'),
    running_mode=VisionRunningMode.IMAGE)

#----------HAND LANDMARK DATA GENERATION FUNCTION------------#
def generate_landmark_data(video_name, gesture_label):
    with HandLandmarker.create_from_options(options) as landmarker:
        # Intializing video file path and data file
        video_file_path = "nui-module-training/videos/%s.mp4" % (video_name)
        if csv_generating:
            data_file = open("nui-module-training/generated-data/%s.csv" % (video_name), "w")
            csv_writer = csv.writer(data_file)

        # Accessing each frame in the 
        cap = cv2.VideoCapture(video_file_path)
        fps = cap.get(cv2.CAP_PROP_POS_MSEC)
        success, img = cap.read()
        frame_no = 0
        sample_rate = 5
        if success:
            print("Video %s.mp4 successfully loaded. Now proceeding to extraction of hand gesture data." % video_name)
        while success:
            if frame_no % sample_rate == 0:
                # Using a temporary .jpg version of the video frame to generate mp.Image()

                if csv_generating:
                    cv2.imwrite('nui-module-training/buffer_image.jpg', img)
                    mp_frame = mp.Image.create_from_file('nui-module-training/buffer_image.jpg')
                    detection_result = landmarker.detect(mp_frame)

                if visualizing:
                    print(mp_frame.numpy_view())
                    annotated_image = draw_landmarks_on_image(img, detection_result) #does not seem to be updated for new data structure of detection results
                    cv2.imshow('annotated image', annotated_image)
                    cv2.waitKey()

                if csv_generating:
                    frame_data = []
                    for keypoints in detection_result.hand_landmarks:
                        for keypoint in keypoints:
                            keypoint_position = str(keypoint.x) + ' ' + str(keypoint.y) + ' ' + str(keypoint.z)
                            frame_data.append(keypoint_position)
                    frame_data.append(gesture_label)
                    csv_writer.writerow(frame_data)

                #run to generate frames for gesture recognition model training dataset
                if frame_generating:
                    frame_file_path = "nui-module-training/frames/%s/%s%s.jpg" % (gesture_label, video_name, str(frame_no))
                    cv2.imwrite(frame_file_path, img)

                # Frame cap (debugging mode)
                if frame_no >= 30 and visualizing:
                    break

                # Progress monitoring
                if frame_no % 50 == 0:
                    print(frame_no, "frames so far")

            # read next frame
            success, img = cap.read()
            fps = cap.get(cv2.CAP_PROP_POS_MSEC)
            if success:
                frame_no += 1
        
        if csv_generating:
            data_file.close()

#----------ITERATING THROUGH VIDEOS------------#
with open("nui-module-training/videos/video_names.txt") as video_names_file:
    for line in video_names_file:
        video_name, label = map(str, line.strip().split())
        generate_landmark_data(video_name, label)


