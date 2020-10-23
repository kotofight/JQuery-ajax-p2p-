$(function () {
    // alert(11)
    $('.applybtn').on('click', function () {
        localStorage.setItem('type', $(this).data('type'))
        location.href = '#borrow_apply'
    })
})