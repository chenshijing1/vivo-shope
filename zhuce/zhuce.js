var count=0
document.querySelectorAll('.addr')[0].addEventListener('click',()=>{
    count++
    var guo=document.querySelector('.addoption.guo')
    count%2!==0?guo.style.display='block':guo.style.display='none'
})
document.querySelectorAll('.addoption')[0].querySelectorAll('li').forEach(item=>{
   item.addEventListener('click',function(){
    console.log(this.innerText);
      document.querySelector('.addr.guo>span').innerHTML=`${this.innerText} >` 
   })
})

document.querySelectorAll('.addr')[1].addEventListener('click',()=>{
    count++
    var phone=document.querySelector('.addoption.phone')
    count%2!==0?phone.style.display='block':phone.style.display='none'
 })
 document.querySelectorAll('.addoption')[1].querySelectorAll('li').forEach(item=>{
    item.addEventListener('click',function(){
       var phone=this.querySelectorAll('span')[1].innerText
       console.log(phone);
       
       document.querySelector('.addr.phone>span').innerHTML=`${phone} >`
       document.querySelector('.addoption.phone').style.display='none'
    })
 })

//  注册
var zhuce=document.forms.zhuce
zhuce.addEventListener('submit',e=>{
    e.preventDefault()
    var newuser=[{
        username:e.currentTarget.username.value,
        phonenumber:e.currentTarget.phonenumber.value,
        yanzhengma:Math.floor(Math.random()*999999+100000),
        select:false
    }]

    var oldlocalStorage=localStorage.getItem('newuser')
    if(oldlocalStorage!==null){
        var dataArr=JSON.parse(oldlocalStorage)
        if(dataArr.forEach(item=>{
            item.username===newuser[0].username
        })){
            alert("用户已经存在")
            return;
        }
        dataArr.push(newuser[0])
        oldlocalStorage=JSON.stringify(dataArr)
    }else{
        oldlocalStorage=JSON.stringify(newuser)
    }
    localStorage.setItem('newuser',oldlocalStorage)
    window.location.href='../login/login.html'
    alert('注册成功')
})