//登录
$(function () {
    $('#btn').click(function () {
        $.post('http://localhost:3000/api/login', {
            username: $('input[type=text]').val(),
            password: $('input[type=password]').val()
        }, function (res) {
            if (res.code === 0) {
                //登录成功
                alert('登陆成功');
                console.log(res)
                location.href = '../index.html';
                //存入localStorage
                localStorage.setItem('nickname', res.data.nickname);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('isAdmin', res.data.isAdmin);
                localStorage.setItem('id', res.data._id);
            } else {
                //登录失败
                alert(res.msg)
            }
        })
    })
})
