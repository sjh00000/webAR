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
            const model = document.createElement('a-entity')
            const image = document.createElement('a-image')
            var modelUrl
            var imageUrl

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
                        imageUrl=response[i].image_url
                        console.log(imageUrl)
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

                        //简介图片设置
                        image.setAttribute('src',imageUrl)
                        image.setAttribute('position','3 0 -10')
                        image.setAttribute('id','nowimage')
                        image.setAttribute('scale','3 3 3')

                        // 将model添加到<a-scene>中
                        scene.appendChild(model)
                        scene.appendChild(image)
                        console.log(model)
                        console.log(image)
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
            const model = document.querySelector('#nowmodel')
            const image = document.querySelector('#nowimage')
            const scene = document.querySelector('a-scene')
            scene.removeChild(model)
            scene.removeChild(image)
        })
    
    }


})()