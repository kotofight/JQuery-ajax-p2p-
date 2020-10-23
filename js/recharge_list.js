$(function () {
    var userid = JSON.parse(localStorage.user).id
    let page = 1;
    let pageNum = 3;
    let flag = false;
    let maxPage;

    function getRechargeList(page) {
        $('#list-page').html(page)
        let rechargeStr = '';
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/chargeRecord',
            type: 'get',

            data: {
                userid,
                pageIndex: page,
                pageSize: pageNum,
            },
            success: function (res) {
                let { data, total, code } = res;
                maxPage = Math.ceil(total / pageNum);
                $('#list-total-page').html(maxPage)
                if (code === 200) {
                    for (let i = 0; i < data.length; i++) {
                        rechargeStr += `
                        <tr>
                    <td>
                    <p>${data[i].chargeTime}</p>
                </td>
                <td>
                    <p>${data[i].bankName}</p>
                </td>
                <td>
                    <p>${data[i].branchName}</p>
                </td>
                <td>
                    <p>${data[i].chargemoney}</p>
                </td></tr>
                    `
                    }
                    if (!flag) {
                        $("#page5").paging({
                            pageNum: page, // 当前页面
                            totalNum: Math.ceil(total / pageNum), // 总页码
                            totalList: total, // 记录总数量
                            callback: function (num) { //回调函数
                                getRechargeList(num)
                            }

                        });
                        flag = true
                    }
                }
                $('#recharge-list-tbody').html(rechargeStr)
            }
        })
    }

    getRechargeList(page)

    $('#last-page').on('click', function () {
        $('#next-page').removeProp('disabled')
        page -= 1
        if (page < 1) {
            $('#last-page').prop('disabled', 'false')
            page = 1;
        }
        getRechargeList(page)
    })

    $('#next-page').on('click', function () {
        $('#last-page').removeProp('disabled')
        page += 1
        if (page > maxPage) {
            $('#next-page').prop('disabled', 'false')
            page = maxPage;
        }
        getRechargeList(page)
    })
})