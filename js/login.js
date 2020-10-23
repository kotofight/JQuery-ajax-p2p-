$(function () {
    // console.log(111)
    $('#loginbtn').on('click', function () {
        // alert(111)
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        // console.log(username, pwd)
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/login',
            type: 'post',
            data: {
                username,
                pwd
            },
            success: function (data) {
                // console.log(data)
                var { code, msg } = data;
                if (code === 200) {
                    var data = data.data;
                    localStorage.setItem('user', JSON.stringify(data))
                    alert(msg);
                    location.href = '../index.html'
                } else if (code === 500) {
                    alert(msg)
                }
            }
        })
    })
})
