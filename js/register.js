$(function () {
    $('#btn').click(function () {
        $.post('http://localhost:3000/api/register', {
            username: $('input[type=text]').val(),
            password: $('input[type=password]').val(),
            nickname: $("input[name='nickname']").val(),
            sex: $("input[name='sex']:checked").val(),
            age: $("input[name='age']").val(),
            isAdmin: $("input[name='isAdmin']:checked").val()
        }, function (res) {
            if (res.code === 0) {
                //注册成功
                console.log(res)
                alert('注册成功');
                location.href = '../html/login.html';
            } else {
                //注册失败
                alert(res.msg)
            }
        })
    })
})