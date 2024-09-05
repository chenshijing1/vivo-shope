
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


function addrshow(){
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=Array.from(newuser).findIndex(item=>item.select===true)
    var arrStr=''
    var addrlist=JSON.parse(localStorage.getItem(`${newuser[x].username}addr`))
    console.log(addrlist);
    
    if(addrlist===null){
        document.querySelector('.person-info').innerHTML=
   `<div class="person-addr">
        <div class="t-add">+</div>
        <div><span>添加新地址</span></div>
    </div>`
    }else{
        Array.from(addrlist).forEach(item=>{
            arrStr+=`
            <div class="person-addr-after ${item.morenaddr?"active":""}">
                   <div class="person-after-name">
                       <span>${item.name}</span>
                       <span>${item.phone}</span>
                   </div>
                   <div><span>${item.addrsheng}</span>
                       <span>${item.addrarea}</span>
                       <span>${item.addrplace}</span>
                       <span>${item.detailaddr}</span>
                   </div>
                   <div class="person-after-edio">
                       <span class="edit-moren" style="display:${item.morenaddr?"none":"block"};">设置为默认地址</span>
                       <span class="edit-updata">编辑</span>
                       <span class="edit-remove">删除</span>
                   </div>
                   <div class="smallmoren" style="display:${item.morenaddr?"block":"none"};"}">默认</div>
           </div>
            `
          })
          document.querySelector('.person-info').innerHTML=arrStr+
          `<div class="person-addr">
               <div class="t-add">+</div>
               <div><span>添加新地址</span></div>
           </div>`
    }
   
       // 删除地址
       document.querySelectorAll('.edit-remove').forEach((item,i)=>{
        console.log(this);
        var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=Array.from(newuser).findIndex(item=>item.select===true)
        item.index=i
        item.addEventListener('click',function(){
            if(!confirm('是否删除？')) return;
            var addrlist=JSON.parse(localStorage.getItem(`${newuser[x].username}addr`))
            if(addrlist[this.index].morenaddr===true){
                addrlist[this.index-1]?.morenaddr===true
                window.localStorage.setItem(`${newuser[x].username}addr`,JSON.stringify(addrlist))
            }
            if(this.classList.contains('person-addr-after.active')){
                document.querySelectorAll('.person-addr-after')[this.index-1]?.classList.add('active')
            }
            addrlist.splice(this.index,1)
            window.localStorage.setItem(`${newuser[x].username}addr`,JSON.stringify(addrlist))
            addrshow()
            alert("删除成功")
        })
    })
    //设置默认值
    document.querySelectorAll('.edit-moren').forEach((item,i)=>{
        var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=Array.from(newuser).findIndex(item=>item.select===true)
         item.index=i
         item.addEventListener('click',function(){
            var addrlist=JSON.parse(localStorage.getItem(`${newuser[x].username}addr`))
            addrlist.forEach(item=>item.morenaddr=false)
            addrlist[this.index].morenaddr=true
            window.localStorage.setItem(`${newuser[x].username}addr`,JSON.stringify(addrlist))
            addrshow()
            footshow(this.index)
         })
    })

    //点击地址框激活样式
    document.querySelectorAll('.person-addr-after').forEach((item,i)=>{
        item.index=i
        item.addEventListener('click',function(){
            document.querySelector('.person-addr-after.active')?.classList.remove('active')
            this.classList.add('active')
            footshow(this.index)
        })
    })

    //编辑
    document.querySelectorAll('.edit-updata').forEach((item,i)=>{
        item.index=i
        item.addEventListener('click',function(){
            document.querySelector('.edit-addr').style.display='flex'
            var addrlist=JSON.parse(localStorage.getItem(`${newuser[x].username}addr`))
            edit.pushname.value=addrlist[this.index].name
            edit.pushnum.value=addrlist[this.index].phone
            edit.shen.value=addrlist[this.index].addrsheng
            edit.area.value=addrlist[this.index].addrarea
            edit.place.value=addrlist[this.index].addrplace
            edit.detailaddr.value=addrlist[this.index].detailaddr
            edit.moren.checked=addrlist[this.index].morenaddr
            edit.UorA.value=addrlist[this.index].UorA
            
        })
    })
}

document.forms.formedit.addEventListener('submit',e=>{
    e.preventDefault()
   var newpersoninfo=[{
    name:e.currentTarget.pushname.value,
    phone:e.currentTarget.pushnum.value,
    addrsheng:e.currentTarget.shen.value,
    addrarea:e.currentTarget.area.value,
    addrplace:e.currentTarget.place.value,
    detailaddr:e.currentTarget.detailaddr.value,
    morenaddr:e.currentTarget.moren.checked
   }]
   console.log(e.currentTarget.pushname);
   var newuser=JSON.parse(window.localStorage.getItem('newuser'))
   var x=Array.from(newuser).findIndex(item=>item.select===true)
   var hiddennum=parseInt(e.currentTarget.UorA.value)
   var addrStorage=localStorage.getItem(`${newuser[x].username}addr`)
   if(hiddennum===0){
    if(addrStorage===null){addrStorage=JSON.stringify([])}
    newpersoninfo[0].UorA=(JSON.parse(addrStorage)[JSON.parse(addrStorage).length-1]?.UorA||0)+1
    console.log(newpersoninfo);
    
    if(addrStorage===null){
     addrStorage=JSON.stringify(newpersoninfo)
    }else{
     var arrlist=JSON.parse(addrStorage)
     if(newpersoninfo[0].morenaddr===true){
         arrlist.forEach(item=>{
             item.morenaddr=false
         })
     }
     arrlist.push(newpersoninfo[0])
     addrStorage=JSON.stringify(arrlist)
    }
    window.localStorage.setItem(`${newuser[x].username}addr`,addrStorage)
    addrshow()
   }else{
    //是修改
    newpersoninfo[0].UorA=hiddennum
    var arrlist=JSON.parse(addrStorage)
    var a=parseInt(e.currentTarget.UorA.value)
    var i=Array.from(arrlist).findIndex(item=>item.UorA===a)
    if(newpersoninfo[0].morenaddr===true){
        arrlist.forEach(item=>{
            item.morenaddr=false
        })
    }
    arrlist.splice(i,1,newpersoninfo[0])
    addrStorage=JSON.stringify(arrlist)
    window.localStorage.setItem(`${newuser[x].username}addr`,addrStorage)
    addrshow()
    footshow(i)
   }
   document.querySelector('.edit-addr').style.display='none'
})

// 渲染订单商品
function showList(){
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var i=Array.from(newuser).findIndex(item=>item.select===true)
    var listStr=''
    var cardata=JSON.parse(window.localStorage.getItem(`${newuser[i].username}`))
    console.log(cardata);
    
    cardata.forEach(item=>{
        listStr+=`
        <div class="table-content">
            <div class="table-image">
                <div class="image"><img src=${item.goodsimage} alt=""></div>
                <div class="table-detail">
                    <span>${item.goodsname} ${item.version} ${item.goodscolor}</span>
                    <span>${item.goodscolor}</span>
                </div>
            </div>
            <div>${item.goodsprice}.00</div>
            <div>${item.number}</div>
            <div>-0.00</div>
            <div style="color: red;">${item.goodsprice*item.number}.00</div>
        </div>
        `
    })
    document.querySelector('.table-content-box').innerHTML=listStr
}

//订单底部渲染
function footshow(i){
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var x=Array.from(newuser).findIndex(item=>item.select===true)
    var footStr=0
    var cardata=JSON.parse(window.localStorage.getItem(`${newuser[x].username}`))
    cardata.forEach(item=>{
        footStr+=item.goodsprice*item.number
    })
    var addrlist=JSON.parse(localStorage.getItem(`${newuser[x].username}addr`))
        document.querySelector('.order-foot-five').innerHTML=`
    <div class="price-list">
        <span>合计(不含运费): ￥1299.00</span>
        <span>运费：￥0.00</span>
        <div>优惠:<span style="color: red;">￥-0.00</span></div>
        <div>积分抵扣：<span style="color: red;">-￥3.00</span></div>
        <span>赠送积分：${footStr}</span>
    </div>
    <div class="info-list">
        <div>应付总额：<span style="color: red; font-size: 36px;">￥${footStr}.00</span></div>
        <span>收件人：${addrlist[i].name} ${addrlist[i].phone}</span>
        <span>配送地址：${addrlist[i].addrsheng}${addrlist[i].addrarea}${addrlist[i].addrplace}</span>
    </div>
    <button class="pay">提交订单</button>
    `
    document.querySelector('.pay').addEventListener('click',()=>{
        document.querySelector('.black').style.display="flex"
    })
    document.querySelector('.no').addEventListener('click',()=>{
        document.querySelector('.black').style.display='none'
     })
     document.querySelector('.confirm>img').addEventListener('click',()=>{
         document.querySelector('.black').style.display='none'
     })
     document.querySelector('.yes').addEventListener('click',()=>{
        document.querySelector('.confirm').style.display='none'
        document.querySelector('.white-box').style.display='flex'

        if(document.querySelector('.white-box').style.display='flex'){
            var miao=4
            var timer=setInterval(()=>{
                if(document.querySelector('.miao').innerText==="1"){
                    clearInterval(timer)
                    var x=Array.from(newuser).findIndex(item=>item.select===true)
                    window.location.href='../person/person.html?username='+newuser[x].username
                }
                document.querySelector('.miao').innerText=`${miao--}`
            },1000)
         }
        var now = new Date();
        // 输出格式化的日期和时间
        // 获取年、月、日、小时、分钟、秒
        var year = now.getFullYear();
        var month = now.getMonth() + 1; // 月份是从0开始的
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        
        // 为单个部分补零
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var time=year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
         var cargoods=JSON.parse(window.localStorage.getItem(`${newuser[x].username}`))
         var ordergoods={order:cargoods,time:time,ordernumber:Date.now()}
         if(JSON.parse(window.localStorage.getItem(`${newuser[x].username}order`))===null){
            window.localStorage.setItem(`${newuser[x].username}order`,JSON.stringify([]))
         }
            var order=JSON.parse(window.localStorage.getItem(`${newuser[x].username}order`))
            console.log(order);
            order.push(ordergoods)
            window.localStorage.setItem(`${newuser[x].username}order`,JSON.stringify(order))
            window.localStorage.setItem(`${newuser[x].username}`,JSON.stringify([]))
         
     })
     
}


window.addEventListener('load',()=>{
    nav();
    showList();
   addrshow()

})

//页底订单渲染判断

var newuser=JSON.parse(window.localStorage.getItem('newuser'))
var i=Array.from(newuser).findIndex(item=>item.select===true)
var addrlist=JSON.parse(localStorage.getItem(`${newuser[i].username}addr`))
if(addrlist===null||addrlist.length===0){
    addrshow()
    var footStr=0
    var newuser=JSON.parse(window.localStorage.getItem('newuser'))
    var i=Array.from(newuser).findIndex(item=>item.select===true)
    var cardata=JSON.parse(window.localStorage.getItem(`${newuser[i].username}`))
    cardata.forEach(item=>{
        footStr+=item.goodsprice*item.number
    })
    document.querySelector('.order-foot-five').innerHTML=`
    <div class="price-list">
        <span>合计(不含运费): ￥1299.00</span>
        <span>运费：￥0.00</span>
        <div>优惠:<span style="color: red;">￥-0.00</span></div>
        <div>积分抵扣：<span style="color: red;">-￥3.00</span></div>
        <span>赠送积分：${footStr}</span>
        </div>
        <div class="info-list">
        <div>应付总额：<span style="color: red; font-size: 36px;">￥${footStr}.00</span></div>
        </div>
        <button class="pay">提交订单</button>
        `
}else{
    addrshow();
    var i=addrlist.findIndex(item=>item.morenaddr===true)
    footshow(i)
}



var edit=document.forms.formedit
var personinfo=document.querySelector('.person-info')
    document.querySelector('.x').addEventListener('click',()=>{
        document.querySelector('.edit-addr').style.display='none'
    })
    //增添地址
    personinfo.addEventListener('click',(e)=>{
        if(!e.target.classList.contains('person-addr')) return;
        document.querySelector('.edit-addr').style.display='flex'
        edit.reset()
        edit.UorA.value=0
        console.log(1);
        
    })
    //返回上一页
    document.querySelector('.back').addEventListener('click',function(){
        window.history.back()
    })



