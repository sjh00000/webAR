const cv = require('opencv4js')
// 加载图像
let img1 = cv.imread('image1.jpg');
let img2 = cv.imread('image2.jpg');

// 创建 AKAZE 检测器
let akaze = cv.AKAZE_create();

// 提取特征点和描述符
let keypoints1 = new cv.KeyPoints();
let descriptors1 = new cv.Mat();
akaze.detectAndCompute(img1, new cv.Mat(), keypoints1, descriptors1);

let keypoints2 = new cv.KeyPoints();
let descriptors2 = new cv.Mat();
akaze.detectAndCompute(img2, new cv.Mat(), keypoints2, descriptors2);

// 匹配特征点
let matches = new cv.DMatchVector();
let bf = new cv.BFMatcher(cv.NORM_HAMMING, true);
bf.match(descriptors1, descriptors2, matches);

// 根据匹配结果进行识别
if (matches.size() > 10) {
    console.log('图像匹配成功！');
} else {
    console.log('图像匹配失败！');
}