$(function () {
    // console.log(111)
    // var hash = location.hash
    var user = JSON.parse(localStorage.getItem('user'))
    function loadPage() {
        var hash = location.hash.substr(1);
        // console.log(hash)
        // $('#content').load('../pages/index.html')
        switch (hash) {
            case 'borrow':
                $('#content').load('../pages/borrow.html')
                break;
            case 'borrow_info':
                $('#content').load('../pages/borrow_info.html')
                break;
            case 'invest':
                $('#content').load('../pages/invest.html')
                break;
            case 'borrow_apply':
                $('#content').load('../pages/borrow_apply.html')
                break;
            case 'recharge':
                $('#content').load('../pages/recharge.html')
                break;
            case 'Withdraw_apply':
                $('#content').load('../pages/Withdraw_apply.html')
                break;
            case 'personal':
                loadChildChange('personal/info')
                break;
            case 'personal/card':
                loadChildChange(hash)
                break;
            case 'personal/info':
                loadChildChange(hash)
                break;

            case 'personal/realname':
                loadChildChange(hash)
                break;
            case 'personal/bid_request_list':
                loadChildChange(hash)
                break;
            case 'personal/accountFlow_list':
                loadChildChange(hash)
                break;
            case 'personal/recharge_list':
                loadChildChange(hash)
                break;
            case 'personal/userInfo':
                loadChildChange(hash)
                break;
            case 'personal/invest_list':
                loadChildChange(hash)
                break;
            default:
                if (user) {
                    $('#content').load('../pages/main.html');
                } else {
                    $('#content').load('../pages/mainwithoutlogin.html');

                }

        }
        changeActive(hash)
    }

    loadPage();
    function changeActive(hash) {
        hash = hash.split('/')[0];
        console.log(hash)
        // console.log($(`#headnavmenu a[href="#${hash}"]`))

        if (hash == 'borrow_apply') {
            hash = 'borrow'
        } else if (hash == 'borrow_info') {
            hash = 'invest'
        }
        $(`#headnavmenu a`).removeClass('active')
        $(`#headnavmenu a[href="#${hash}"]`).addClass('active')
    }
    function changeChildActive(hash) {
        // console.log($(`#headnavmenu a[href="#${hash}"]`))
        $(`#left-side a`).removeClass('active')
        $(`#left-side a[href="#${hash}"]`).addClass('active')
        $(`.head-href`).removeClass('active')
        // console.log($(`.head-href`))
    }
    function loadChildChange(hash) {
        let isRightExit = $('#right-side').length == 1 ? true : false;
        if (isRightExit) {
            $('#right-side').load(`../pages/${hash}.html`)
            changeChildActive(hash)
        } else {
            $('#content').load('../pages/personal.html', function () {
                $('#right-side').load(`../pages/${hash}.html`)
                changeChildActive(hash)
            })



        }
    }


    if (user) {
        $('#loginnav').html(`<a class="nav-link" href="#personal">${user.nickname}</a>`)
        $('#regnav').html(`<a class="nav-link" href="#">注销</a>`)
    } else {
        $('#loginnav').html(`<a class="nav-link" href="./login.html">登录</a>`)
        $('#regnav').html(`<a class="nav-link" href="./register.html">快速注册</a>`)
    }
    $('#regnav').on('click', 'a', function () {
        localStorage.removeItem('user');
        location.href = '../index.html'
    })


    window.onhashchange = loadPage;
    if (user) {
        $('.header .headnav-withlogin').html(`<a class="nav-link" href="#recharge">赶快充值</a>`)
        $('#headnavmenu').html(`<li class="nav-link"><a class="active disabled" href="#">首页</a></li>
        <li class="nav-link headnav-withlogin"><a href="#invest">我要投资</a></li>
        <li class="nav-link headnav-withlogin"><a href="#borrow">我要借款</a></li>
        <li class="nav-link headnav-withlogin"><a href="#personal">个人中心</a></li>`)
        changeActive(location.hash.substr(1).split('/')[0])
    } else {
        $('#headnavmenu').html(`<li class="nav-link"><a class="active disabled" href="#">首页</a></li>
        `)
        $('.headnav .head-slogan').html(`<span class="slogan1">用心</span><span class="slogan2 ml-3">--只为更多选择。</span>`)
    }
})