(function updater(){
    // 查找具有指定类型和URL的<a-nft>元素
    var nftElements = document.querySelectorAll('a-nft[type="nft"]')
    var nftElement = Array.from(nftElements)
    console.log(nftElement.length)
    for(var i =0 ;i<nftElement.length;i++){
        console.log(nftElement[i])
        const nowid=nftElement[i].id
        nftElement[i].addEventListener('markerFound',(event)=> {
            const scene = document.querySelector('a-scene')
            const id =nowid
            //const image = document.createElement('a-image')
            const model = document.createElement('a-entity')
            var modelUrl;
            //Three.js流动线条模型
            //const model = document.createElement('a-arline')

            //文字图片
            //image.setAttribute('src','../image.png')
            //image.setAttribute('position','0 -2 -10')
            //image.setAttribute('id','nowimage')
            //image.setAttribute('width','10')
            //image.setAttribute('height','3')

            //ajax获取模型
            $.ajax({
                url: '/getdata/nftdata',
                method: 'GET',
                success: function(response) {
                  // 在成功回调函数中处理返回的JSON数据
                  for (var i = 0; i < response.length; i++) {
                    var nftId = response[i].id;
                    if(nftId==id){
                        modelUrl=response[i].model_url
                        //模型设置
                        model.setAttribute('gltf-model', modelUrl)
                        model.setAttribute('position', '0 1 -10')
                        model.setAttribute('id','nowmodel')
                        if(nftId==7)
                        model.setAttribute('scale','0.01 0.005 0.01')
                        else if(nftId==6){
                          model.setAttribute('scale','3 3 3')
                        }
                        else{
                          model.setAttribute('scale','1.5 0.7 1.5')
                        }
                        model.setAttribute('look-controls','enabled:true')
                        //model.setAttribute('start' , '0 0 -5')
                        //model.setAttribute('end' , '5 0 -5')
                        //model.setAttribute('color', '0xff0000')
                                
                                
                        //scene.appendChild(image)
                        // 将model添加到<a-scene>中
                        scene.appendChild(model)
                        console.log(model)
                        //console.log(image)
                    }
                  }
                },
                error: function(error) {
                  // 处理请求错误
                  console.log(error)
                }
            });

        } );
    
        nftElement[i].addEventListener('markerLost', (event) => {

            //const image = document.querySelector('#nowimage')
            const model = document.querySelector('#nowmodel')
            //const model = document.querySelector('#line')

            const scene = document.querySelector('a-scene')
            scene.removeChild(model)
            //scene.removeChild(image)
        
          })
    
    }


})()