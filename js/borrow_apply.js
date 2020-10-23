$(function () {
    // alert(111)
    var canborrow = false;
    var userid = JSON.parse(localStorage.user).id
    $('#borrow-btn').on('click', function () {
        var inputval = [$('#borrow-number').val(), $('#borrow-interest').val(), $('#borrow-min').val(), $('#borrow-bonus').val(), $('#borrow-title').val(), $('#borrow-say').val()]
        canborrow = inputval.every(function (v) {
            return v
        })
        if (canborrow) {
            $.ajax({
                url: 'http://139.9.177.51:3333/p2p/borrow',
                type: 'post',
                data: {
                    userid,
                    borrowType: localStorage.type,
                    borrowmoney: $('#borrow-number').val(),
                    interest: $('#borrow-interest').val(),
                    borrowtime: $('#borrow-term').val(),
                    repaytype: $('input[name=gridRadios]:checked').val(),
                    minbid: $('#borrow-min').val(),
                    bouns: $('#borrow-bonus').val(),
                    days: $('#borrow-day').val(),
                    title: $('#borrow-title').val(),
                    info: $('#borrow-say').val(),
                },
                success: function (data) {
                    var { code, msg } = data;
                    if (code === 200) {
                        alert(msg)
                        location.href = '#borrow'
                    } else if (code === 500) {
                        alert(msg)
                    }
                }
            })
        } else {
            alert('请填写完整借款信息')
        }

    })

    switch (localStorage.type) {
        case '1': $('#borrowBadge').html('信用标')
            break;
        case '2': $('#borrowBadge').html('车易贷')
            break;
        case '3': $('#borrowBadge').html('房易贷')
            break;
    }

})