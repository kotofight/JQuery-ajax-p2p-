$(function () {
    let borrowid = JSON.parse(localStorage.id)
    let minbid;
    let ownmoney;
    function borrowInfoDraw() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getborrowinfo',
            type: 'get',
            data: {
                borrowid
            },
            success(res) {
                let { code, msg } = res;
                if (code === 200) {
                    let data = res.data;
                    minbid = data.minbid;
                    ownmoney = data.borrowmoney - data.ownmoney;
                    if (ownmoney === 0) {
                        $('#confirm').prop('disabled', true).text('已集满')
                    }
                    let pro = ((data.ownmoney / data.borrowmoney) * 100).toFixed(2)
                    let str = `
                <div class="progress-bar"
                            style="width: ${pro}%; background: linear-gradient(to right, #da81a1 ${(pro / 2)}%,#7aa4c8 ${pro}%); ">
        <div div  > ${pro} %</div >
                        </div >
        `
                    $('#borrow-info-username').html(data.username)
                    $('#chargeMinbid').html(minbid)
                    $('#borrow-info-title').html(data.title)
                    $('#borrow-info-borrowmoney').html(data.borrowmoney + '￥')
                    $('#borrow-info-interest').html(data.interest + '%')
                    $('#borrow-info-borrowtime').html(data.borrowtime + '月')
                    $('#borrow-info-repaytype').html(data.repaytype == 0 ? '按月分期' : '按月到期')
                    $('#borrow-info-minbid').html(data.minbid + '￥')
                    $('#borrow-info-need').html(ownmoney + '￥')
                    $('#chargeNeed').html(ownmoney + '￥')
                    $('#borrow-info-progress').html(str)
                } else if (code === 500) {
                    alert(msg)
                }
            }
        })
    }
    borrowInfoDraw()

    $('#chargeConfirm').on('click', function () {
        if (isNaN(parseInt($('#chargeMoney').val()))) {
            alert('请输入正确金额')
            $('#chargeMoney').val(minbid)
        } else {
            if ($('#chargeMoney').val() < minbid) {
                alert('投资金额不能小于最小投标')
            } else if ($('#chargeMoney').val() > ownmoney) {
                alert('投资金额不能大于剩余需求，目前此项目最大投资' + ownmoney + '元')
                $('#chargeMoney').val(ownmoney)
            } else {
                $.ajax({
                    url: 'http://139.9.177.51:3333/p2p/invest',
                    type: 'post',
                    data: {
                        userid: JSON.parse(localStorage.user).id,
                        borrowid,
                        chargemoney: $('#chargeMoney').val(),
                    },
                    success(data) {
                        var { code, msg } = data;
                        if (code === 200) {
                            alert(msg)
                            $('#staticBackdrop').modal('hide')
                            borrowInfoDraw()
                        } else if (code === 500) {
                            alert(msg)
                        }
                    }
                })
            }
        }


    })


})