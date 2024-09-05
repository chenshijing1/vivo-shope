
// 下拉菜单
function nav(){
        axios({
                method:'GET',
                url:"http://127.0.0.1:4523/m1/4936564-0-default/index/nav"
        }).then(res=>{
                console.log(res.data.data);
                var list=res.data.data
                var navItemUl=document.querySelector('.nav-item>ul')
               navItemUl.innerHTML=list.reduce((result,item)=>result+=`
                    <li class=${item.children.length!==0?"pouple":''}>
                            <span>${item.title}</span>
                            <div class="pouple-item">
                               <ul class="warp">
                                ${item.children.map(item=>`
                                    <li>
                                        <a href="">
                                            <div>
                                                <img class="img1" src="${item.image}" alt="">
                                                <img class="img2" src="${item.image}" alt="">
                                                <img class="img3" src="${item.image}" alt="">
                                            </div>
                                            <span class="goodsname">${item.name}</span>
                                        </a>
                                    </li>
                                `).join('')}
                               </ul>
                               <div class="nav-left" style="display:${item.children.length===0?'none':'block'};"><img src="../images/left.png" alt=""></div>
                               <div class="nav-right" style="display:${item.children.length===0?'none':'block'};"><img src="../images/right.png" alt=""></div>
                            </div>
                        </li>
                `,'')
                var pouple=document.querySelectorAll('.pouple>span')
               
                pouple.forEach((item,i)=>{
                   var index=list[i].children
                   var iNow=0;
                    var count=Math.ceil(index.length/6)-1
                    
                    item.addEventListener('mouseenter',function(){
                        
                    var warp=this.nextElementSibling.querySelector('.warp')
                    var navLeft=this.nextElementSibling.querySelector('.nav-left')
                    var navRight=this.nextElementSibling.querySelector('.nav-right')
                    function tab(){
                        var iTarget=iNow===count?-iNow*1440+(6-index.length%6)*(1440/6):iNow*-1440
                        warp.style.transition="all 0.5s"
                        warp.style.transform=`translateX(${iTarget}px)` 
                    }  
                      
                        navRight.addEventListener('click',()=>{
                            iNow++
                            iNow=Math.min(iNow,count)
                            tab()
                            
                            
                        }) 
                        navLeft.addEventListener('click',()=>{
                           
                            iNow--
                            iNow=Math.max(0,iNow)
                            tab()
                            
                        })

                        this.parentNode.parentNode.addEventListener('mouseleave',()=>{
                            iNow=0
                            tab()
                        })
                    })
                })

               
                
                
        })
}

var userinfo=JSON.parse(window.localStorage.getItem('newuser'))
var i=Array.from(userinfo).findIndex(item=>item.select===true)
    if(Array.from(userinfo).some(item=>item.select===true)){
        document.querySelector('.person').innerHTML=`
        <a href="../person/person.html?username=${userinfo[i].username}">我的订单</a>
        <a class="backlogin" style="cursor:pointer;">退出登录</a>
        `
    }


function changBackground(index){
    var banner=document.querySelector('.banner-containt')
    banner.style.backgroundImage=`url(../../bannerimage/banner00${index+1}.jpg)`
}
var point=document.querySelectorAll('.point')
for(var i=0;i<point.length;i++){
    point[i].index=i
    point[i].addEventListener('click',function(){
         changBackground(this.index)
         console.log(this.index);
         
    })
}

//轮播图
function banner(){
        axios({
                method:'GET',
                url:"http://127.0.0.1:4523/m1/4936564-0-default/index/banner/image"
        }).then(res=>{
                var list=res.data.data
                
        })
}

//倒计时
      function countdown(){
        let nowTime=new Date()
        var hours=document.querySelector('.hours')
        var minute=document.querySelector('.minute') 
        var seconds=document.querySelector('.second')
        // console.log(hours,minute,seconds);
        
  
        let endTime=new Date('2024 11-20 23:00:00')
        
        let surplusTime=(endTime-nowTime)/1000

        let h=parseInt(surplusTime/60/60%24)
        let m=parseInt(surplusTime/60%60)
        let s=parseInt(surplusTime%60)

        hours.innerHTML=h<10?"0"+h:h
        minute.innerHTML=m<10?"0"+m:m
        seconds.innerHTML=s<10?"0"+s:s

        setInterval(countdown,1000)
      }

//秒杀商品
function secondgoods(){
    axios({
        method:"GET",
        url:"http://127.0.0.1:4523/m1/4936564-0-default/index/seconds/goods"
    }).then(res=>{
        console.log(res.data.data);
        var list=res.data.data
        var secondsContent=document.querySelector('.seconds-content>ul')
        var listStr=""
        list.forEach(item=>listStr += `
            <li>
                <img src="${item.image}" alt="">
                <h5 class="goodsname">${item.name}</h5>
                <div>
                    <span class="price"><i>￥</i>${item.price}</span>
                    <span class="oldprice"><i>￥</i> ${item.oldprice}</span>
                </div>
            </li>
        `)
        secondsContent.innerHTML=listStr
        
        var iNow=0;
        var count=Math.ceil(list.length/4)-1

        function tab(){
            var target=iNow===count?iNow*-1200+(list.length%4)*300:iNow*-1200
            secondsContent.style.transform=`translateX(${target}px)`
            secondsContent.style.transition='all 0.4s'
        }
        document.querySelector('.content-right').addEventListener('click',function(){
            iNow++;
            iNow=Math.min(count,iNow)
            tab()
        })
        document.querySelector('.content-left').addEventListener('click',()=>{
            iNow--;
            iNow=Math.max(iNow,0)
            tab()
        })
    })
}

//获取精品数据

function art(){
    axios({
        method:"GET",
        url:"http://127.0.0.1:4523/m1/4936564-0-default/index/art/data"

    }).then(res=>{
        var list=res.data.data
            var content=document.querySelector('.content')
        content.insertAdjacentHTML('beforeend',`
             <!-- 热卖区 -->
             <div class="hotgoods">
                <div class="hotgoods-title"><span>${list[0].title}</span></div>
                <div class="hotgoods-content">
                    <ul>
                    ${list[0].children.map(item=>`
                        <li>
                            <img src="${item.image}" alt="">
                            <div>
                                <h5>${item.name}</h5>
                                <p>${item.detail}</p>
                            </div>
                            <span>￥${item.price}.00</span>
                        </li>
                        `).join('')}
                    </ul>
                </div>
             </div>
            <!-- 热卖区开始 -->
            <!-- 精品区开始 -->
             <div class="art">
                <div class="hotgoods-title"><span>${list[1].title}</span></div>
                <div class="art-content">
                    <ul class="art-item art-phone"> 
                       <li>
                        <a href="">
                            <img class="art-avatar" src="${list[1].avatar}" alt="">
                        </a>
                       </li>
                       ${list[1].children.map(item=>`
                        <li>
                        <a href="../detail/detail.html?id=${item.id}">
                            <img class="art-image" src="${item.image}" alt="">
                            <div>
                                <h5>${item.name}</h5>
                                <p>${item.detail}</p>
                            </div>
                            <span>￥${item.price}.00</span>
                        </a>
                       </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="art-title">
                    <span>${list[2].title}</span>
                    <a href="">
                        <span>平板手机</span>
                        <span>手机充电</span>
                        <span>手机壳膜</span>
                        <span>更多 &gt;</span>
                    </a>
                </div>
                <div class="art-content">
                    <ul class="art-item art-pj">
                    ${list[2].children.map(item=>`
                        <li>
                            <a href="">
                                <img class="art-image" src="${item.image}" alt="">
                                <div>
                                    <h5>${item.name}</h5>
                                    <p>${item.detail}</p>
                                </div>
                                <span>￥${item.price}.00</span>
                            </a>
                        </li>
                        `).join('')} 
                     </ul>
                </div>
             </div>
            <!-- 精品区结束 -->
            `)
    })
}

window.addEventListener('load',()=>{
        nav();
        // banner();
        countdown()
        secondgoods();
        art()
})
