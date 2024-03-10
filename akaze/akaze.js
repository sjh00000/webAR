
let videoElement, canvasElement, context, videoWidth, videoHeight;
let isTemplateLoaded = false;
// OpenCV.js加载完成后的回调函数
(function onOpenCVReady() {
    videoElement = document.getElementById('videoElement');
    console.log(videoElement)
    canvasElement = document.getElementById('canvasElement');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            videoElement.srcObject = stream;
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });
    console.log("111")
    videoElement.addEventListener('canplay', function () {
        videoWidth = this.videoWidth;
        videoHeight = this.videoHeight;
        canvasElement.width = videoWidth;
        canvasElement.height = videoHeight;
        matchImages() ;
    });
})()



function matchImages() {
    
    let src = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    let dst = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
    let cap = new cv.VideoCapture(videoElement);

    cap.read(src); 

    // 加载并处理模板图片
    console.log("222")
    if (!isTemplateLoaded) {
        let templateImage = new Image();
        templateImage.src = '../smokingboy.png';
        console.log(templateImage)
        console.log(222)
        isTemplateLoaded = true;
        templateImage.onload = function () {
            let templateMat = cv.imread(templateImage);
            // 初始化AKAZE检测器
            let akaze = cv.AKAZE.create();
            // 在模板图像中检测特征点和描述符
            let kp1 = new cv.KeyPoints();
            let des1 = new cv.Mat();
            akaze.detectAndCompute(templateMat, new cv.Mat(), kp1, des1);
            // 在目标图像中检测特征点和描述符
            let kp2 = new cv.KeyPoints();
            let des2 = new cv.Mat();
            akaze.detectAndCompute(src, new cv.Mat(), kp2, des2);
            // 使用FLANN匹配器进行特征点匹配
            let flann = cv.FlannBasedMatcher_create();
            let matches = new cv.DMatchVectorVector();
            flann.knnMatch(des1, des2, matches, 2);
            // 根据Lowe's ratio test选择最佳匹配
            let good_matches = [];
            for (let i = 0; i < matches.size(); ++i) {
                let match = matches.get(i);
                if (match.size() > 1) {
                    if (match.get(0).distance < 0.7 * match.get(1).distance) {
                        good_matches.push(match.get(0));
                    }
                }
            }
        
            // 如果匹配点数足够，则认为匹配成功
            if (good_matches.length > 1) {
                console.log("匹配成功！执行相应操作。");
                // 执行相应操作
                const model = document.createElement('a-entity')
                const scene = document.querySelector('a-scene')
                model.setAttribute('a-box')
                model.setAttribute('position', '0 0 -10')
                model.setAttribute('color','red')
                scene.appendChild(model)
            } else {
                console.log("匹配失败。");
            }
        
            templateMat.delete();
            kp1.delete();
            kp2.delete();
            des1.delete();
            des2.delete();
            matches.delete();
        };
    }

    
    cv.imshow('canvasElement', src);
    src.delete();
    dst.delete();
    requestAnimationFrame(matchImages);
}