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
                location.href = "login.html";
            }
        }
    });
    $('.category').click(function(){
        $('.child').slideToggle();
    });
    $('.icon_menu').click(function(){
        $('.aside').toggleClass('hid');
        $('.main').toggleClass('hid');
        $('.topbar').toggleClass('hid');
    });
    $('#loginOut').click(function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(res){
                if(res.success){
                    location.href = "login.html";
                }
            }
        });
    });
})