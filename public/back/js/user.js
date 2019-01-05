/**
 * Created by Administrator on 2019/1/5.
 */
$(function(){
    $.ajax({
        url:'/user/queryUser',
        type:'get',
        data:{
            page: 1,
            pageSize: 5},
        dataType:'json',
        success:function(res){
            console.log(res);
            res.status = {1:'正常',0:'禁用'};
            res.statusClass = {1:'btn-danger',0:'btn-success'};
            res.statusVal = {1:'禁用',0:'启用'};
            var str = template( "con", res );
            $('.container-fluid tbody').append( str );
        }
    });
})