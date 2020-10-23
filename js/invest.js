$(function () {
    const pageSize = 7;
    const page = 1;
    let flag = false;
    let arr = []
    // alert(111)
    function getlist(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getBorrowList',
            type: 'get',
            data: {
                pageIndex: page,
                pageSize
            },
            success: function (res) {
                var { code, msg, total } = res;
                let str = ''
                if (code === 200) {
                    let data = res.data
                    arr = []
                    for (let key in data) {
                        str += `
                        <tr>
                        <td>${data[key].username}</td>
                        <td>${data[key].title}</td>
                        <td>${data[key].interest.toFixed(2)}%</td>
                        <td>${data[key].borrowmoney}</td>
                        <td>${data[key].repaytype = 0 ? '按月分期' : '按月到期'}</td>
                        <td>${((data[key].ownmoney / data[key].borrowmoney) * 100).toFixed(2)}%</td>
                        <td><button class="btn btn-warning btn-sm text-white invest-btn">查看</button></td>
                    </tr>
                        `
                        arr.push(data[key].id)
                    }
                    $('#investBody').html(str)
                    console.log(arr)
                    if (!flag) {
                        $("#page1").paging({
                            pageNum: page, // 当前页面
                            totalNum: Math.ceil(total / pageSize), // 总页码
                            totalList: total, // 记录总数量
                            callback: function (num) { //回调函数
                                getlist(num)
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
    getlist(page)
    $('#investBody').on('click', '.invest-btn', function () {
        let index = $(this).index('.invest-btn')
        localStorage.setItem('id', arr[index])
        location.href = '#borrow_info'
    })
})
