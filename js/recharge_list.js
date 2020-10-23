$(function () {
    var userid = JSON.parse(localStorage.user).id
    $.ajax({
        url: 'http://139.9.177.51:3333/p2p/chargeRecord',
        type: 'get',
        data: {
            userid,
            pageIndex: 1,
            pageSize: 10,
        },
        success: function (data) {
            console.log(data)
        }
    })
})