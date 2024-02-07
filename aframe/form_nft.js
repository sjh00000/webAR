
(function createUrl(){
    $.ajax({
        url: '/getdata/nftdata',
        method: 'GET',
        success: function(response) {
          // 在成功回调函数中处理返回的JSON数据
          for (var i = 0; i < response.length; i++) {
            var nftUrl = response[i].nft_url;
            var nftId = response[i].id;
            // 处理nftUrl字段的值
            console.log(nftUrl)
            createNft(nftUrl,nftId)
          }
        },
        error: function(error) {
          // 处理请求错误
          console.log(error)
        }
    });
})()

function createNft(nftUrl,nftId){
    const scene = document.querySelector('a-scene');
    const nft = document.createElement('a-nft');
    
    //参数设置
    nft.setAttribute('url', nftUrl);
    nft.setAttribute('type', 'nft');
    nft.setAttribute('id',nftId)
    nft.setAttribute('detectionMethod','AKAZE');
    
    // 将<a-nft>元素添加到<a-scene>中
    scene.appendChild(nft);
    console.log(nft)

}