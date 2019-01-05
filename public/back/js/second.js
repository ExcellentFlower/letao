/**
 * Created by Administrator on 2019/1/5.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    rander()
    function rander() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
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
                    totalPages: Math.ceil(res.total / res.size),
                    // 当页面被点击时触发
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        rander();
                    }
                });
            }
        });
    }

    $('#addCategory').on('click', function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 1000
            },
            success: function (res) {
                var str = template('categoryCon', res);
                $('.dropdown-menu').html(str);
            }
        });
    });
    $('.dropdown-menu').on('click','li',function(){
        //console.log($(this).find('a').text());
        $('.dropdownText').text($(this).find('a').text());
        $('.dropdownText').attr('data-id',$(this).attr('data-id'));
    });
    $('#pic').fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            $('#imgBox img').attr('src',data.result.picAddr);
        }
    });
    $('#btnAdd').on('click',function(){
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            dataType: 'json',
            data: {
                brandName: $('.brandName').val(),
                categoryId: $('.dropdownText').attr('data-id'),
                brandLogo: $('#imgBox img').attr('src')
            },
            success: function (res) {
                $('#myModal2').modal('hide')
                rander();
                //var str = template('categoryCon', res);
                //$('.dropdown-menu').html(str);
            }
        });
    });
})