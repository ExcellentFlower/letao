/**
 * Created by Administrator on 2019/1/5.
 */
$(function () {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function (res) {
            console.log(res);
            var str = template('con', res);
            $('.container-fluid tbody').append(str);
        }
    });
    $('#btnAdd').off('click').on('click', function () {

    });
})