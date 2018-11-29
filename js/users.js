$(function () {
    getList();
})

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
                        <td>${list[i].username}</td>
                        <td>${list[i].nickname}</td>
                        <td>${list[i].age}</td>
                        <td>${list[i].sex}</td>
                        <td>${list[i].isAdmin}</td>
                        <td><a>修改</a></td>
                    </tr>
                `
            }
            $('#tbody').html(TB);

            //分页
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

        } else {
            alert(res.msg);
        }
    })
}