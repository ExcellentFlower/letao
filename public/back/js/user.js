/**
 * Created by Administrator on 2019/1/5.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:'/user/queryUser',
            type:'get',
            data:{
                page: currentPage,
                pageSize: pageSize},
            dataType:'json',
            success:function(res){
                console.log(res);
                res.status = {1:'正常',0:'禁用'};
                res.statusClass = {1:'btn-danger',0:'btn-success'};
                res.statusVal = {1:'禁用',0:'启用'};
                var str = template( "con", res );
                $('.container-fluid tbody').html( str );
                $('#paginator').bootstrapPaginator({
                    // 指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: res.page,
                    // 总页数
                    totalPages: Math.ceil( res.total / res.size ),
                    // 当页面被点击时触发
                    onPageClicked: function( a, b, c, page ) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    $('table tbody').on('click',' button',function(){
        $('#submitBtn').attr('data-id', $(this).data('id'));

        var isDelete=$(this).hasClass('btn-danger')?0:1;
        var id = $(this).data('id');
        $('#submitBtn').off('click').on('click',function(){
            console.dir({id:id,isDelete:isDelete});
            $.ajax({
                url:'/user/updateUser',
                data:{id:id,isDelete:isDelete},
                type:'post',
                dataType:'json',
                success:function(res){
                    console.log(res);
                    if(res.success){
                        $('#myModal2').modal('hide')
                        render();
                    }
                }
            });
        })
    });
})