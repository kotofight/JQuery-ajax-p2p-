$(function () {
    let pageSize = 6;
    let page = 1
    let flag = false;
    let total;
    function getInvestList(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/investList',
            type: 'get',
            data: {
                userid: JSON.parse(localStorage.user).id,
                pageIndex: page,
                pageSize
            },
            success(res) {
                var { code, msg, total } = res;
                if (code === 200) {
                    var data = res.data
                    let str = ''
                    for (let i = 0; i < data.length; i++) {
                        str += `
                    <tr>
                    <td>
                        ${data[i].title}
                    </td>
                    <td>
                    ${data[i].chargeTime}
                    </td>
                    <td>
                    ${data[i].borrowmoney}
                    </td>
                    <td>
                    ${data[i].chargemoney}
                    </td>
                </tr>
                    `
                    }
                    $('#investListBody').html(str)

                    if (!flag) {
                        $("#page3").paging({
                            pageNum: page, // 当前页面
                            totalNum: Math.ceil(total / pageSize), // 总页码
                            totalList: total, // 记录总数量
                            callback: function (num) { //回调函数
                                getInvestList(num)
                            }

                        });
                        flag = true
                    }
                } else if (code === 500) {
                    alert(msg)
                }
            }

        })
    }
    getInvestList(page)
})