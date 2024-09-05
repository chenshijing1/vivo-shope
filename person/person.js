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
        <a href="../index/index.html" class="backlogin" style="cursor:pointer;">退出登录</a>
        `
    }
    
document.querySelector('.backlogin')?.addEventListener('click',()=>{   
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=newuser.findIndex(item=>item.select===true)
    newuser[x].select=false
    window.localStorage.setItem('newuser',JSON.stringify(newuser))
})

document.querySelectorAll('.person-select').forEach(item=>{
    item.addEventListener('click',function(){
        document.querySelector('.person-select.active').classList.remove('active')
        this.classList.add('active')
    })
})
//页面获取localStorage中的数据
const params=new URLSearchParams(window.location.search)
const username=params.get('username')
console.log(username);
var newuser=JSON.parse(window.localStorage.getItem('newuser'))
var name=(newuser.find(item=>item.username===username)).username
document.querySelector('.person-left>div>ul').innerHTML=`
<li>${name}</li>
<li>我的积分:346</li>
`

//渲染账单
function ordershow(){
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=Array.from(newuser).findIndex(item=>item.select===true)
    var goodsorder=JSON.parse(window.localStorage.getItem(`${newuser[x].username}order`))
    var listStr=''
    var total=0
    if(goodsorder===null){return;}
    Array.from(goodsorder).forEach(item=>{
        total=item.order.map(item=>item.number*item.goodsprice)
        listStr+=`
        <div class="li1-content-content">
        <div class="li-head">
            <span class="a">订单号:${item.ordernumber}</span>
            <span class="b">成交时间:${item.time}</span>
            <span class="remove-order">删除订单</span>
        </div>
        ${item.order.map(item=>`
            <div class="li-middle">
                <div class="li-middle-image"><img src="${item.goodsimage}" alt=""></div>
                <div class="li-middle-detail">
                <div class="li-middle-goodsname">
                    <span>${item.goodsname} ${item.version} ${item.goodscolor}</span>
                    <span>${item.number}</span>
                    <span>${item.goodsprice}.00</span>
                </div>
                <div class="li-middle-goodsname">
                    <span>赠品：趣味贴纸</span>
                    <span>1</span>
                    <span>9.90</span>
                </div>
                </div>
                <div class="li-kong"></div>
                <div class="li-cancel">已购买</div>
                <div class="looklist">查看订单</div>
            </div>
            `).join('')}
            <div class="li-foot">
            <span>应付总额：￥${total}.00</span>
            </div>
        </div>
        `
    })
    document.querySelector('.li1-content-container').innerHTML=listStr


    //删除订单
    document.querySelectorAll('.remove-order').forEach((item,i)=>{
        var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=Array.from(newuser).findIndex(item=>item.select===true)
        item.index=i
        item.addEventListener('click',function(){
            document.querySelector('.black').style.display='flex'
            document.querySelector('.no').addEventListener('click',()=>{
                document.querySelector('.black').style.display='none'
            })
            document.querySelector('.confirm>img').addEventListener('click',()=>{
                document.querySelector('.black').style.display='none'
            })
            document.querySelector('.yes').addEventListener('click',()=>{
                
                var order=JSON.parse(window.localStorage.getItem(`${newuser[x].username}order`))
                order.splice(this.index,1)
                window.localStorage.setItem(`${newuser[x].username}order`,JSON.stringify(order))
                document.querySelector('.black').style.display='none'
                ordershow()
            })
        })
    })
}

//回首页
document.querySelector('.gohome').addEventListener('click',()=>{
    var userinfo=JSON.parse(window.localStorage.getItem('newuser'))
    var i=Array.from(userinfo).findIndex(item=>item.select===true) 
    window.location.href='../index/index.html?username='+userinfo[i].username
})
window.addEventListener('load',()=>{
    ordershow();
    nav();
})

