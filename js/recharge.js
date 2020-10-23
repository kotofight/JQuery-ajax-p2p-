$(function () {
    // 选项卡
    let lis = document.querySelectorAll('#rechage-tab li')
    let ps = document.querySelectorAll('#rechage-tab li p')
    let contents = document.querySelectorAll('#rechage-content li')
    // console.log(lis, ps, divs)
    for (let i = 0; i < lis.length; i++) {
        ps[i].addEventListener('click', function () {
            for (let i = 0; i < lis.length; i++) {
                contents[i].classList.add('d-none')
                ps[i].classList.remove('on')
            }
            ps[i].classList.add('on')
            contents[i].classList.remove('d-none')
        })
    }
    var userid = JSON.parse(localStorage.user).id;
    var username = JSON.parse(localStorage.user).username;
    var cardid = [];
    $.ajax({
        url: 'http://139.9.177.51:3333/p2p/cardList',
        type: 'get',
        data: {
            userid,
        },
        success: function (data) {
            var { code, msg } = data;
            if (code === 200) {
                var cardlist = data.data;
                let card = ''
                let cardstr = ''
                for (let i = 0; i < cardlist.length; i++) {
                    card += `
                    <tr>
                    <td><span class="bank bank1"></span></td>
                    <td>${username}</td>
                    <td>${cardlist[i].cardNumber}</td>
                    <td>${cardlist[i].branchName}</td>
                     </tr>
                    `
                    cardstr += `
                        <option>${cardlist[i].bankName}${cardlist[i].cardNumber}(${cardlist[i].branchName})</option>
                        `
                    cardid.push(cardlist[i].id)
                }
                $('#banklist').html(card)
                $('#rechargecard').html(cardstr)
            } else if (code === 500) {
                alert(msg)
            }

        }
    })
    $('#rechargebtn').on('click', function () {
        let selectindex = rechargecard.selectedIndex;
        if ($('#money').val()) {
            $.ajax({
                url: 'http://139.9.177.51:3333/p2p/charge',
                type: 'post',
                data: {
                    userid,
                    money: $('#money').val(),
                    cardid: cardid[selectindex],
                },
                success: function (data) {
                    var { code, msg } = data;
                    if (code === 200) {
                        alert(msg)
                        $('#money').val('')
                        location.href = '#personal'
                    } else if (code === 500) {
                        alert(msg)
                    }
                }
            })
        } else {
            alert('充值金额不能为空')
        }


    })
})