$(function () {
    // console.log(111)
    $('#username').on('blur', validateusername)
    $('#pwd').on('blur', validatepwd)
    $('#dbpwd').on('blur', validatedbpwd)
    $('#email').on('blur', validateemail)
    $('#nickname').on('blur', validatenickname)

    function validateusername() {
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,8}$/;
        var flag = false;
        var val = $('#username').val();
        if (val === '') {
            $('#username').css('border', '2px solid red');
            $('#username-span').html('请输入用户名').css('color', 'red')
        } else if (!reg.test(val)) {
            $('#username').css('border', '2px solid red');
            $('#username-span').html('请输入2-8个字母、数字、下划线、中文').css('color', 'red')
        } else {
            $.ajax({
                url: 'http://139.9.177.51:3333/p2p/accrepeat',
                type: 'post',
                async: false,
                data: {
                    username: val
                },
                success: function (data) {
                    var { code, msg } = data;
                    if (code === 200) {
                        $('#username').css('border', '2px solid green');
                        $('#username-span').html('')
                        flag = true;
                    } else if (code === 500) {
                        $('#username').css('border', '2px solid red');
                        $('#username-span').html(msg).css('color', 'red')
                    }
                }
            })

        }
        return flag;
    }
    function validatepwd() {
        // console.log(222)
        var reg = /^(\w){6,20}$/;
        var flag = false;
        var val = $('#pwd').val();
        if (val === '') {
            $('#pwd').css('border', '2px solid red');
            $('#pwd-span').html('请输入密码').css('color', 'red')
        } else if (!reg.test(val)) {
            $('#pwd').css('border', '2px solid red');
            $('#pwd-span').html('只能输入6-20个字母、数字、下划线  ').css('color', 'red')
        } else {
            $('#pwd').css('border', '2px solid green');
            $('#pwd-span').html('')
            flag = true;
        }
        return flag;
    }
    function validatedbpwd() {
        var flag = false
        var val_pwd = $('#pwd').val();
        var val = $('#dbpwd').val();
        if (val === '') {
            $('#dbpwd').css('border', '2px solid red');
            $('#dbpwd-span').html('请再次输入密码').css('color', 'red')
        } else if (val_pwd !== val) {
            $('#dbpwd').css('border', '2px solid red');
            $('#dbpwd-span').html('两次密码不一样').css('color', 'red')
        } else {
            $('#dbpwd').css('border', '2px solid green');
            $('#dbpwd-span').html('')
            flag = true;
        }
        return flag
    }
    function validateemail() {
        var reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
        var flag = false;
        var val = $('#email').val();
        if (val === '') {
            $('#email').css('border', '2px solid red');
            $('#email-span').html('请输入邮箱').css('color', 'red')
        } else if (!reg.test(val)) {
            $('#email').css('border', '2px solid red');
            $('#email-span').html('只能输入正确的邮箱').css('color', 'red')
        } else {
            $('#email').css('border', '2px solid green');
            $('#email-span').html('')
            flag = true;
        }
        return flag;
    }
    function validatenickname() {
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,8}$/;
        var flag = false;
        var val = $('#nickname').val();
        if (val === '') {
            $('#nickname').css('border', '2px solid red');
            $('#nickname-span').html('请输入昵称').css('color', 'red')
        } else if (!reg.test(val)) {
            $('#nickname').css('border', '2px solid red');
            $('#nickname-span').html('请输入2-8个字母、数字、下划线、中文').css('color', 'red')
        } else {
            $('#nickname').css('border', '2px solid green');
            $('#nickname-span').html('')
            flag = true;
        }
        return flag;
    }

    $('#regbtn').on('click', function () {
        var arr = [validateusername, validatepwd, validatedbpwd, validateemail, validatenickname]
        var arr2 = arr.map(function (fn) {
            return fn();
        })
        var vaild = arr2.some(function (v) {
            return v
        })
        if (vaild) {
            $.ajax({
                url: 'http://139.9.177.51:3333/p2p/reg',
                type: 'post',
                data: {
                    username: $('#username').val(),
                    pwd: $('#pwd').val(),
                    email: $('#email').val(),
                    nickname: $('#nickname').val()
                },
                success: function (data) {
                    var { msg, code } = data;
                    if (code === 200) {
                        alert(msg);
                        location.href = '../login.html'
                    } else if (code === 500) {
                        alert(msg)
                    }


                }
            })
        }
    })
})
