import mediapipe as mp
import numpy as np
import cv2
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# if not os.path.exists('nui-module-training/hand_landmarker.task'):
#     print('File does not exist')
# else:
#     print("yes")

# Create a hand landmarker instance with the video mode:
options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path='nui-module-training/hand_landmarker.task'),
    running_mode=VisionRunningMode.IMAGE)

with HandLandmarker.create_from_options(options) as landmarker:
    test_file = open("nui-module-training/data/test_data.txt", "w")

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
            mp_image_vid = mp.Image(image_format=mp.ImageFormat.SRGB, data=img)
            result_vid = landmarker.detect(mp_image_vid)

            mp_image_img = mp.Image.create_from_file('nui-module-training/hand.png')
            # result_img = landmarker.detect(mp_image_img)

            # cv2.imwrite('nui-module-training/non-mp_color_img.jpg', img)
            # cv2.imshow("image", img)
            # cv2.waitKey()

            print(fno, "frame mark", fps)
            print(mp_image_img.numpy_view())
            # cv2.imwrite('nui-module-training/color_img.jpg', mp_image_img.numpy_view())
            # cv2.imshow("image", mp_image_img.numpy_view())
            # cv2.waitKey()
            print("==================img/vid arrays divider===============")
            print(mp_image_vid.numpy_view())
            # cv2.imwrite('nui-module-training/color_vid_frame.jpg', mp_image_vid.numpy_view())
            # cv2.imshow("video frame", mp_image_vid.numpy_view())
            # cv2.waitKey()


            # print(hand_landmarker_vid)
            print(result_vid)
            # test_file.writelines(hand_landmarker_result.hand_world_landmarks)
            
            if fno > 1:
                break

        # read next frame
        success, img = cap.read()
        fps = cap.get(cv2.CAP_PROP_POS_MSEC)
        if success:
            fno += 1
    
    test_file.close()