import mediapipe as mp
import numpy as np
import cv2
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from PIL import Image
from mediapipe.framework.formats import landmark_pb2
from mediapipe import solutions

BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

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

# if not os.path.exists('nui-module-training/hand_landmarker.task'):
#     print('File does not exist')
# else:
#     print("yes")

# Create a hand landmarker instance with the video mode:
options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path='nui-module-training/hand_landmarker.task'),
    running_mode=VisionRunningMode.IMAGE)

with HandLandmarker.create_from_options(options) as landmarker:
    test_file = open("nui-module-training/data/test_data_vid-with_buffer_frames.txt", "w")

    cap = cv2.VideoCapture("nui-module-training/video.mp4")
    fps = cap.get(cv2.CAP_PROP_POS_MSEC)
    # print(type(fps))
    success, img = cap.read()
    # np_img = np.copy(img)
    fno = 0
    sample_rate = 1
    if success:
        print("Video successfully loaded. Now proceeding to extraction of hand gesture data.")
        # print(type(img.data))
    while success:
        # print("success")
        if fno % sample_rate == 0:
            cv2.imwrite('nui-module-training/buffer_image.jpg', img)
            # mp_image_vid = mp.Image(image_format=mp.ImageFormat.SRGB, data=img)
            mp_image_vid = mp.Image.create_from_file('nui-module-training/buffer_image.jpg')
            result_vid = landmarker.detect(mp_image_vid)

            # mp_image_img = mp.Image.create_from_file('nui-module-training/hand.png')
            # img_file = cv2.imread("nui-module-training/hand.png")
            # mp_image_img_file = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_file)
            # result_img = landmarker.detect(mp_image_img_file)

            # cv2.imwrite('nui-module-training/non-mp_color_img_SRGBA.jpg', img)
            # cv2.imshow("image", img)
            # cv2.waitKey()

            # print(fno, "frame mark", fps)
            # print(mp_image_img.numpy_view())
            # cv2.imwrite('nui-module-training/test-img-encoded/color_img.jpg', mp_image_img.numpy_view())
            # cv2.imshow("mp_image_img", mp_image_img.numpy_view())
            # cv2.waitKey()
            # print("==================img/vid arrays divider===============")
            # print(mp_image_vid.numpy_view())
            # cv2.imwrite('nui-module-training/color_vid_frame_SRGB.jpg', mp_image_vid.numpy_view())
            # cv2.imshow("mp_image_vid", mp_image_vid.numpy_view())
            # cv2.waitKey()


            # print(hand_landmarker_vid)
            # print(result_vid)
            annotate_array = {'landmark': list()}
            for i in result_vid.hand_landmarks:
                test_file.write(str(len(i)) + ' \n')
                for j in i:
                    test_file.write(j.__repr__() + '\n')
                    # cv2.circle(img, (int(j.x * img.shape[1]), int(j.y * img.shape[0])), 10, (255, 255, 0), 2)
            # cv2.imshow('Image', img)
            # cv2.waitKey(0)

            # annotated_image = draw_landmarks_on_image(img, result_vid) #does not seem to be updated for new data structure of detection results
            # cv2.imshow('annotated image', annotated_image)
            # cv2.destroyAllWindows()
            # cv2.waitKey()

            #frame buffering
            # if fno >= 30:
            #     break

            #monitoring frame progress
            if fno % 100 == 0:
                print(fno, "frames so far")

        # read next frame
        success, img = cap.read()
        fps = cap.get(cv2.CAP_PROP_POS_MSEC)
        if success:
            fno += 1
    
    test_file.close()