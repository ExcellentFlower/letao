/**
 * Created by Administrator on 2019/1/5.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function rander(){
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            dataType: 'json',
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            success: function (res) {
                console.log(res);
                var str = template('con', res);
                $('.container-fluid tbody').html(str);
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
                        rander();
                    }
                });
            }
        });
    }
    rander();
    $('#btnAdd').off('click').on('click', function () {
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            dataType: 'json',
            data: {categoryName:$('#categoryName').val()},
            success: function (res) {
                if(res.success){
                    $('#myModal2').modal('hide')
                    $('#form').data("bootstrapValidator").resetForm( true );
                    rander();
                }
            }
        });
    });
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }

    });
})