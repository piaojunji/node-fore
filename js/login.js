$(function () {
    $('#btn').click(function () {
        $.post('http://localhost:3000/api/login', {
            username: $('input[type=text]').val(),
            password: $('input[type=password]').val()
        }, function (res) {
            if (res.code === 0) {
                //登录成功
                console.log(res)
                alert('登陆成功');
                location.href = '../index.html';
                //存入localStorage
                localStorage.setItem('nickname', res.data.nickname);
            } else {
                //登录失败
                alert(res.msg)
            }
        })
    })
})