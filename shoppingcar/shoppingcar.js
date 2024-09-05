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
function like(){
    //猜你喜欢里刷新商品
axios({
    method:'get',
    url:'http://127.0.0.1:4523/m1/4936564-0-default/index/art/data'
}).then(res=>{
    var list=res.data.data
    var lists=[]
    var randomlist=[]
    console.log(list);
    list.forEach(item=>{
        lists.push(...item.children)
    })
    for(var i=0;i<16;i++){
        randomlist.push(lists[Math.floor(Math.random()*(lists.length+1))])
    }
    console.log(randomlist);
    console.log(document.querySelector('.like-content>ul'));
    
   document.querySelector('.like-content>ul').innerHTML=Array.from(randomlist).reduce((result,item)=>{
    result+=`
    <li>
        <a class="like" href="">
            <img src="${item.image}" alt="">
            <div class="name"><h2>${item.name}</h2></div>
            <span>${item.detail}</span>
            <div class="buy">
                <span>￥${item.price}</span>
                <div><img src="../imageText/shoppingcar.png" alt=""></div>
            </div>
        </a>
    </li>
    `
    return result
   },'')  
    
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

    document.querySelector('.guang').addEventListener('click',()=>{
        window.location.href="../index/index.html"   
     })
     document.querySelectorAll('.continue')[1].addEventListener('click',()=>{
        window.location.href="../index/index.html"   
     })
     document.querySelectorAll('.continue')[0].addEventListener('click',()=>{
        window.location.href="../index/index.html"   
     })

//获取数据渲染
var newuser=JSON.parse(window.localStorage.getItem('newuser'))
var i=Array.from(newuser).findIndex(item=>item.select===true)
var dataArr=JSON.parse(localStorage.getItem(`${newuser[i].username}`))
var Arr=new Set();
dataArr.forEach(item=>Arr.add(item.id))



function setThis(){
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var i=Array.from(newuser).findIndex(item=>item.select===true)
    var dataArr=JSON.parse(localStorage.getItem(`${newuser[i].username}`))
    console.log(dataArr);
    
    document.querySelector('.table').innerHTML=Array.from(dataArr).reduce((result,item)=>result+=
`
<div class="table-content" data-id=${item.id}>
<form action="" class="table-form">
    <div><input class="form-check" type="checkbox" ${Arr.has(item.id)?'checked':''}></div>
    <div class="goodsdetail">
        <div class="goodsdetail-image"><img src="${item.goodsimage}" alt=""></div>
        <div class="goodsdetail-text">
            <span>${item.goodsname}</span>
            <span>${item.version} ${item.goodscolor}</span>
            <div class="goodsdetail-red">
                <span>24期利息</span>
                <span>7天报价</span>
                <span>7天无理由退货</span>
            </div>
        </div>
    </div>
    <div class="price">${item.goodsprice}.00</div>
    <div>
        <div class="js">
        <button class="reduce" ${item.number===1?'disabled':''}>-</button>
        <div class="num">${item.number}</div>
        <button class="add">+</button>
        </div>
    </div>
    <div>0.00</div>
    <div><span style="color: #f51200;">${item.goodsprice*item.number}.00</span></div>
    <div class="operate">
        <span class="bt-remove">删除</span>
        <span class="bt-updata">修改</span>
    </div>
</form>
</div>
`
,'')

var kong=document.querySelector('.car-container.w.kong')
var nokong=document.querySelector('.car-container.w.nokong')
if(dataArr.length!==0&&dataArr!==null){
    kong.style.display='none'
    nokong.style.display='flex'
}else{
    kong.style.display='flex'
    nokong.style.display='none'
}

// var upData=localStorage.getItem(`${newuser[i].username}`)
// upData=JSON.stringify(dataArr)
// localStorage.setItem(`${newuser[i].username}`,upData)
}



//删除按钮
var table=document.querySelector('.table')
table.addEventListener('click',e=>{
   if(!e.target.classList.contains('bt-remove')) return;
   if(!confirm('是否确定删除！')) return;
   var id=parseInt(e.target.parentNode.parentNode.parentNode.dataset.id)
   var i=Array.from(dataArr).findIndex(item=>item.id===id)
   console.log(i);
   
   Arr.delete(id)
   dataArr.splice(i,1)
   var upData=localStorage.getItem(`${newuser[i].username}`)
    upData=JSON.stringify(dataArr)
    localStorage.setItem(`${newuser[i].username}`,upData)
   setThis()
   tatol()
   alert('删除成功！')
})
//加减按钮
table.addEventListener('click',e=>{
    if(!e.target.classList.contains('add')) return;
    var id=parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.id)
    var iTarget=Array.from(dataArr).find(item=>item.id===id)
    iTarget.number++
    var upData=localStorage.getItem(`${newuser[i].username}`)
    upData=JSON.stringify(dataArr)
    localStorage.setItem(`${newuser[i].username}`,upData)
    setThis()
    tatol()
})
table.addEventListener('click',e=>{
    if(!e.target.classList.contains('reduce')) return;
    var id=parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.id)
    var iTarget=Array.from(dataArr).find(item=>item.id===id)
    iTarget.number--
    var upData=localStorage.getItem(`${newuser[i].username}`)
    upData=JSON.stringify(dataArr)
    localStorage.setItem(`${newuser[i].username}`,upData)
    setThis()
    tatol()
})

//单选和全选联动，下联动上
document.querySelector('.allSelect').addEventListener('click',function(){
    Array.from(dataArr).forEach(item=>{
        this.checked?Arr.add(item.id):Arr.clear()
    })
    console.log(Arr);
    setThis()
    tatol()
    
})

//上联动下
table.addEventListener('click',e=>{
    if(!e.target.classList.contains('form-check')) return;
    var id=parseInt(e.target.parentNode.parentNode.parentNode.dataset.id)
    e.target.checked?Arr.add(id):Arr.delete(id)
    document.querySelector('.allSelect').checked=Arr.size===dataArr.length
    console.log(Arr); 
    setThis()
    tatol()
})

//结算函数
function tatol(){
    var result=dataArr.reduce((res,item)=>{
        if(Arr.has(item.id)){
            res.tatolAll += item.number*item.goodsprice
            res.tatolCount += parseInt(item.number)
        }
        return res;
    },{tatolAll:0,tatolCount:0})
    console.log(result);
    document.querySelector('.total-right>span').innerText=`￥${result.tatolAll}.00`
    document.querySelector('.settlement').disabled=result.tatolCount===0
    document.querySelector('.goodsnum').innerText=`共${result.tatolCount}件商品`
}



//结算按钮跳转
document.querySelector('.settlement').addEventListener('click',()=>{
    window.location.href="../order/order.html"
})

//加载成功后监听事件
window.addEventListener('load',()=>{
    nav()
    setThis()
    tatol()
    like()
})


