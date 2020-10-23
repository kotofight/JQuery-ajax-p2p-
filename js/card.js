$(function () {
    // alert(11)
    var userid = JSON.parse(localStorage.getItem('user')).id;

    // console.log(userid)
    function cardlist() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/cardList',
            type: 'get',
            data: {
                userid
            },
            success: function (data) {
                var { code, msg } = data;
                if (code === 200) {
                    var data = data.data;
                    let ret = '';
                    for (let i = 0; i < data.length; i++) {
                        ret += `
                        <div class=" card col-5 mr-3 d-flex flex-column justify-content-around">
                        <div class="d-flex justify-content-between align-items-end">
                            <p class="iconfont icon-yinxingqia fs40"></p>
                            <p><span class="fs36 mr-3">${data[i].bankName}</span>${data[i].branchName}</p>
                            <button type="button" class="btn btn-outline-secondary">删除</button>
                        </div>
                        <p class="fs30 text-center">${data[i].cardNumber}</p>
                        <div class="d-flex justify-content-around">
                            <p>${data[i].bindTime}</p>
                        </div>

                    </div>
                    `
                    }

                    $('#cardlist').html(ret)
                } else if (code === 500) {
                    alert(msg)
                }
            }
        })
    }
    cardlist();

    $('#addCard').on('click', function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/bindCard',
            type: 'post',
            data: {
                userid,
                bankName: $('#bankName').val(),
                branchName: $('#branchName').val(),
                cardNumber: $('#cardNumber').val()
            },
            success: function (data) {
                // console.log(data)
                var { code, msg, data } = data;
                if (code === 200) {
                    alert('绑定成功');
                    $('#exampleModal').modal('hide')
                    cardlist();
                } else if (code === 500) {
                    alert('绑定失败')
                }
            }
        })
    })
})