$(function () {
    var user = JSON.parse(localStorage.getItem('user'));

    function editUserInfo() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getuserinfo',
            type: 'get',
            data: {
                userid: user.id,
            },
            success: function (data) {
                var { code, msg } = data;
                if (code === 200) {
                    let userinfo = data.data;
                    // console.log(userinfo)
                    let arr = ['nickname', 'email', 'username', 'lastlogintime', 'totalmoney', 'usablemoney', 'blockedmoney'];
                    for (let key in userinfo) {
                        if (arr.includes(key)) {
                            $(`#${key}`).text(userinfo[key])
                        }
                    }
                } else if (code === 500) {
                    alert(msg)
                }
            }
        })
    }
    editUserInfo();
    $('#editModal').on('shown.bs.modal', function (e) {
        // do something...
        $('#edit-nickname').val($('#nickname').text())
        $('#edit-email').val($('#email').text())

    })
    $('#confirm-edit').on('click', function () {

        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/updateuser',
            type: 'post',
            data: {
                userid: user.id,
                nickname: $('#edit-nickname').val(),
                email: $('#edit-email').val()
            },
            success: function (data) {
                var { code, msg } = data;
                if (code === 200) {
                    alert('修改成功')
                    $('#editModal').modal('hide');
                    editUserInfo()
                    user.nickname = $('#edit-nickname').val();
                    localStorage.setItem('user', JSON.stringify(user))
                    $('#loginnav').html(`<a class="nav-link" href="#personal">${user.nickname}</a>`)
                } else if (code === 500) {
                    alert(msg)
                }
            }
        })
    })
})