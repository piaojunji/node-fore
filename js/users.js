$(function () {
    getList();

    //删除用户信息
    setTimeout(function () {
        $('.remove').each(function () {
            $(this).click(function () {
                var username = $(this).parent().siblings(".userName").html()
                console.log(username)
                $.get('http://127.0.0.1:3000/api/user/delete', {
                    username: username
                }, function (res) {
                    if (res.code === 0) {
                        // getList(PAGE)
                        location.href = "http://127.0.0.1:8080/html/users.html"
                    } else {
                        alert(res.msg)
                    }
                })
            })
        })
    }, 20)

    //搜索用户信息
    $('#searchBtn').click(function () {
        $.get('http://127.0.0.1:3000/api/user/search', {
            name: $('#searchInput').val()
        }, function (res) {
            console.log(res);
            if (res.code === 0) {
                var list = res.data.list;
                var TB = ''

                //获取搜索后的用户信息
                for (var i = 0; i < list.length; i++) {
                    TB += `
                            <tr>
                                <th scope="row">${i + 1}</th>
                                <td class = "userName">${list[i].username}</td>
                                <td>${list[i].nickname}</td>
                                <td>${list[i].age}</td>
                                <td>${list[i].sex}</td>
                                <td class="ADMIN">${list[i].isAdmin}</td>
                                <td><a class="remove">删除</a></td>
                            </tr>
                        `
                }
                $('#tbody').html(TB);
            } else {
                alert(res.msg)
            }
        })
    })
})

//自定义一个page
var PAGE = 1

//获取用户列表
function getList(page, pageSize) {
    //初始化处理
    page = page || 1;
    pageSize = pageSize || 5;
    $.get('http://127.0.0.1:3000/api/user/list', {
        page: page,
        pageSize: pageSize
    }, function (res) {
        if (res.code === 0) {
            var list = res.data.list;
            var totalPage = res.data.totalPage;
            var TB = ''
            var pagination = ''

            //获取用户信息
            for (var i = 0; i < list.length; i++) {
                TB += `
                    <tr>
                        <th scope="row">${i + pageSize * PAGE - pageSize + 1}</th>
                        <td class = "userName">${list[i].username}</td>
                        <td>${list[i].nickname}</td>
                        <td>${list[i].age}</td>
                        <td>${list[i].sex}</td>
                        <td class="ADMIN">${list[i].isAdmin}</td>
                        <td><a class="remove">删除</a></td>
                    </tr>
                `
            }
            $('#tbody').html(TB);
            $('#tbody').children().addClass("abc")
            //是否是管理员
            var storage = window.localStorage;
            console.log(storage)
            var admin = storage.isAdmin;
            var nickname = storage.nickname;
            console.log(admin)
            if (admin == "false") {
                $('#yonghu').attr('href', 'javascript:return false')
                $('#yonghu').css('opacity', '0.2')
                $('iframe').attr('src', 'html/aaa.html');
                $('#adminname').html(nickname)
            } else {
                $('#adminname').html(nickname + "(管理员)");

            }

            //管理员删除不了管理员，包括自己
            $('.ADMIN').each(function () {
                if ($(this).html() == "true") {
                    $(this).next().children().html("")
                }
            })

            //获取页数
            pagination = `
                <li >
                    <a href="#" aria-label="Previous" id = "left">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `
            for (var j = 0; j < totalPage; j++) {
                pagination += `<li><a href="#" >${j + 1}</a></li>`
            }
            pagination += `
                <li>
                    <a href="#" aria-label="Next" id = "right">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            `
            $('#paginations').html(pagination);
            $('#paginations').children().find("a").addClass("cba")

            //点击切换页面
            setTimeout(function () {
                for (var i = 1; i < $('#paginations li').length - 1; i++) {
                    (function (j) {
                        $('#paginations li').eq(j).click(function () {
                            getList(j);
                            PAGE = j;
                            console.log(PAGE)
                        })
                    }(i))
                }
                // $('#paginations li').eq(1).addClass("active")
                $('#paginations li').eq(0).click(function () {
                    PAGE = PAGE - 1 <= 0 ? 1 : PAGE - 1
                    getList(PAGE);
                    console.log(PAGE)
                    $('#paginations li').eq(PAGE).addClass("active")
                });
                $('#paginations li').eq($('#paginations li').length - 1).click(function () {
                    PAGE = PAGE + 1 >= $('#paginations li').length - 2 ? $('#paginations li').length - 2 : PAGE + 1
                    getList(PAGE);
                    console.log(PAGE);
                });
                $('#paginations li').eq(PAGE).addClass("active")
            }, 20);

            //退出登录
            $('#btn').click(function () {
                location.href = "http://127.0.0.1:8080/html/login.html";
                localStorage.clear()
            })

        } else {
            alert(res.msg);
        }
    })
}










