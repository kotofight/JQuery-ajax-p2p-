$(function () {
    var user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)

    if (!user) {
        $('#personal').addClass('d-none')
        alert('请先登录')
        location.href = '../login.html'
    }
})