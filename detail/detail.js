const params=new URLSearchParams(window.location.search)
const id=parseInt(params.get('id'))
console.log(id);
//小图左右滑动
function smallimage(){
    axios({
        method:"get",
        url:"http://127.0.0.1:4523/m1/4936564-0-default/index/art/data"

    }).then(res=>{
    var list=res.data.data;
    var idfind=list[1].children.find(item=>item.id===id)
    console.log(idfind);
    document.querySelector('.detail-right-title').innerHTML=`
    <h1>${idfind.name}</h1>
    <span>${idfind.detail}</span>
    `
    document.querySelector('.detail-right-price').innerHTML=`
    <div class="price-one">
        <h3><span>￥</span>${idfind.price}.00</h3>
        <span>￥${idfind.oldprice}</span>
    </div>
    <div class="price-two">
        <div class="zen-box">
            <span>赠品</span>
            <div class="small-zen">
                <img src="../imageText/zen.webp" alt="">
            </div>
        </div>
        <div>
            <span class="jf">积分</span>
            <span>购物送积分</span>
        </div>
    </div>
    `

    var detailLeft=document.querySelector('.detail-left')
    detailLeft.innerHTML=`
    <div class="bigimage">
        <img src="${idfind.image}" alt="">                  
    </div>
    <div class="detail-small-image">
        <img class="small-left" src="../images/left.png" alt="">
        <img class="small-right" src="../images/right.png" alt="">
        <div class="small-ul-box">
            <ul>
            <li><img src="${idfind.image}" alt=""></li>
            ${idfind.small.map(item=>`
                <li><img src="${item}" alt=""></li>
                `).join('')}
            </ul>
        </div>
    </div>
    <div class="collect"><span>收藏商品 (2345人收藏) 分享<span></div>
    `
    var smallimg= document.querySelectorAll('.small-ul-box>ul>li>img')
    smallimg.forEach(item=>{
        item.addEventListener('mouseenter',e=>{    
            document.querySelector('.bigimage>img').src=`${e.target.src}`
        })
    })

    
    var count=0;
    var direction
    var maxcount=idfind.small.length-3
    var smallLeft=document.querySelector('.small-left')
    var smallright=document.querySelector('.small-right')
    var smallUl=document.querySelector('.small-ul-box>ul')
    smallright.addEventListener('click',()=>{
        count++
        count=Math.min(count,maxcount)
        direction=-85*count
        smallUl.style.transform=`translateX(${direction}px)`
        smallUl.style.transition='all 0.5s'
        console.log(direction);
    })
    smallLeft.addEventListener('click',()=>{
        count--
        count=Math.max(0,count)
        direction=-85*count
        smallUl.style.transform=`translateX(${direction}px)`
        smallUl.style.transition='all 0.5s'
        console.log(direction);
        console.log(count)
        
    })

    //加减按钮
var num=1
var add=document.querySelector('.add')
var reduce=document.querySelector('.reduce')
var  number=document.querySelector('.num')
add.addEventListener('click',()=>{
    num+=1
    num===1?reduce.disabled=true:reduce.disabled=false
    number.innerText=num
    fun()
})
reduce.addEventListener('click',()=>{
    num--
    num===1?reduce.disabled=true:reduce.disabled=false
    number.innerText=num
    fun()
})


// 详情右边数据修改
var xingContent=document.querySelectorAll('.xing-content')
xingContent.forEach(item=>{
item.addEventListener('click',e=>{
    var xingproject=e.target.tagName==='SPAN'?e.target.parentNode:e.target
    e.currentTarget.querySelector('.xing-item.active').classList.remove('active')
    xingproject.classList.add('active')
    fun()
})
})
document.querySelector('.xing-content-tc').addEventListener('click',e=>{
var xingproject=e.target.tagName==='SPAN'?e.target.parentNode:e.target
e.currentTarget.querySelector('.xing-item.active').classList.remove('active')
xingproject.classList.add('active')
})

function fun(){
    var active=document.querySelectorAll('.xing-item.active')
    console.log(active);
    var  number=document.querySelector('.num')
    var listStr=''
    var listarr=[]
    active.forEach(item=>listStr+=item.innerText+' ')
    active.forEach(item=>listarr.push(item.innerText))
    document.querySelector('.s').innerHTML=`
    <span class="pay-price">￥${idfind.price*number.innerText}</span>
    <span class="pay-text">已选:${listStr} ${number.innerText}件</span>
    `
}
fun()

document.querySelector('.car').addEventListener('click',()=>{
var newuser=JSON.parse(window.localStorage.getItem('newuser'))

if(newuser===null||Array.from(newuser).every(item=>item.select===false)){
    window.location.href="../login/login.html"
}
var  number=document.querySelector('.num')
var active=document.querySelectorAll('.xing-item.active')
var listarr=[]
active.forEach(item=>listarr.push(item.innerText))
var i=Array.from(newuser).findIndex(item=>item.select===true)
console.log(i);

var data=[{
    goodsname:idfind.name,
    goodsimage:idfind.image,
    id:id,
    version:listarr[0],
    goodscolor:listarr[1],
    number:parseInt(number.innerText),
    goodsprice:idfind.price
}]
console.log(window.localStorage.getItem(`${newuser[i].username}`));
var oldlocalStorage=localStorage.getItem(`${newuser[i].username}`)
if(oldlocalStorage!==null){
    var dataArr=JSON.parse(oldlocalStorage)
    dataArr.push(data[0])
    oldlocalStorage=JSON.stringify(dataArr)
}else{
    oldlocalStorage=JSON.stringify(data)
}
localStorage.setItem(`${newuser[i].username}`,oldlocalStorage)
window.location.href='../shoppingcar/shoppingcar.html'
})
    })  

}





var userinfo=JSON.parse(window.localStorage.getItem('newuser'))
var i=Array.from(userinfo).findIndex(item=>item.select===true)
    if(Array.from(userinfo).some(item=>item.select===true)){
        document.querySelector('.person').innerHTML=`
        <a href="../person/person.html?username=${userinfo[i].username}">我的订单</a>
        <a href="../index/index.html" class="backlogin" style="cursor:pointer;">退出登录</a>
        `
    }
    document.querySelector('.backlogin')?.addEventListener('click',()=>{
        var newuser=JSON.parse(window.localStorage.getItem('newuser'))
        var x=newuser.findIndex(item=>item.select===true)
        newuser[x].select=false
        window.localStorage.setItem('newuser',JSON.stringify(newuser))
    })

//页脚点击滚动到指定位置
var footLi=document.querySelectorAll('.foot-li')
var footContent=document.querySelectorAll('.foot-content')
for(var i=0;i<footLi.length;i++){
    footLi[i].index=i
    footLi[i].addEventListener('click',function(){
        document.querySelector('.foot-li.active').classList.remove('active')
        document.querySelector('.foot-content.active').classList.remove('active')
        this.classList.add('active')
        footContent[this.index].classList.add('active')
        window.scrollTo({top:2102,left:0,behavior:'smooth'})
        
    })
}    

//下拉菜单
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



window.addEventListener('load',()=>{
    nav();
    smallimage();
    
})