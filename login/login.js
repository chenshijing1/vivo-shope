var count=0
document.querySelector('.addr').addEventListener('click',()=>{
    count++
    var guo=document.querySelector('.addoption')
    count%2!==0?guo.style.display='block':guo.style.display='none'
})
document.querySelector('.addoption').querySelectorAll('li').forEach(item=>{
   item.addEventListener('click',function(){
      document.querySelector('.addr>span').innerHTML=`${this.querySelectorAll('span')[1].innerText} >` 
   })
})

// 注册
document.querySelector('.zhuce-button').addEventListener('click',()=>{
    window.location.href='../zhuce/zhuce.html'
})

//手机输入框聚焦
var phonenumber=document.forms.edit.phonenumber
phonenumber.addEventListener('focus',()=>{
    document.querySelector('.prompt').style.display='none'
})
//获取验证码
document.querySelector('.yan-text').addEventListener('click',()=>{
    var phonenumber=document.forms.edit.phonenumber.value
    if(phonenumber===''){
        document.querySelector('.prompt').innerHTML="请先输入手机号"
        document.querySelector('.prompt').style.display='block'
    }else{
            var userinfo=JSON.parse(window.localStorage.getItem('newuser'))
            if(userinfo!==null){var ok=Array.from(userinfo)?.find(item=>item.phonenumber===phonenumber)} 
            
        if(ok===undefined||userinfo===null){
            document.querySelector('.prompt-two').style.display='block'
            document.querySelector('.prompt-two').innerHTML="无该用户，请先注册"
        }else{
            document.querySelector('.prompt-two').style.display='block'
            document.querySelector('.prompt-two').innerHTML=`验证码为:${ok.yanzhengma}`
        }
    }
})
//登录
document.forms.edit.addEventListener('submit',e=>{
    e.preventDefault();
    var userinfo=JSON.parse(window.localStorage.getItem('newuser')) 
    console.log(userinfo);
    
    var edit=document.forms.edit
    var phonenumber=document.forms.edit.phonenumber.value
    var i=Array.from(userinfo).findIndex(item=>item.phonenumber===phonenumber)
    
    if(Array.from(userinfo).findIndex(item=>item.yanzhengma===parseInt(edit.yan.value))===-1){
        alert('验证码有错误请重新输入……')
    }else{
        userinfo.forEach(item=>item.select=false)
        userinfo[i].select=true;
        window.localStorage.setItem('newuser',JSON.stringify(userinfo))
        window.location.href='../person/person.html?username='+userinfo[i].username
    }
})