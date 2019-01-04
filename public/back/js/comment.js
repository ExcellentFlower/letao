/**
 * Created by Administrator on 2019/1/4.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        dataType:'json',
        success:function(res){
            if(res.success){
                return;
            }
            else {
                location.href = "user.html";
            }
        }
    });
})