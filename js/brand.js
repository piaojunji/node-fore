//点击切换到品牌管理页面
$('#brand').click(function () {
    $('iframe').attr("src", "html/brand.html")
})

//新增品牌部分显示隐藏
$("#brandBtn").click(function () {
    // $("#brandAdd").toggle();
    $("#brandAdd").css("top", 41);
});
$(".brandAdd").click(function () {
    // $("#brandAdd").toggle();
    $("#brandAdd").css("top", -500);
});


$(function () {
    brandList();

    //添加品牌信息
    $('.brandAdd').click(function () {
        var brandLogo = "LOGO"
        var brandName = $('#brandSelect').val()
        console.log($('#brandSelect').val())
        $.get('http://127.0.0.1:3000/api/brand/add', {
            brandLogo: brandLogo,
            brandName: brandName
        }, function (res) {
            if (res.code === 0) {
                brandList();
            } else {
                alert(res.msg)
            }
        })
    })

    //删除品牌信息
    setTimeout(function () {
        $('.remove').each(function () {
            $(this).click(function () {
                var brandName = $(this).parent().siblings(".brandName").html()
                $.get('http://127.0.0.1:3000/api/brand/delete', {
                    brandName: brandName
                }, function (res) {
                    if (res.code === 0) {
                        location.href = "http://127.0.0.1:8080/html/brand.html"
                    } else {
                        alert(res.msg)
                    }
                })
            })
        })
    }, 20)
})

//获取品牌信息
function brandList() {
    $.get('http://127.0.0.1:3000/api/brand/list', function (res) {
        if (res.code === 0) {
            var list = res.data.list;
            console.log(list)
            var TB = ''
            //获取品牌信息
            for (var i = 0; i < list.length; i++) {
                TB += `
                    <tr>
                        <td scope="row">${i + 1}</td>
                        <td>${list[i].brandLogo}</td>
                        <td class="brandName">${list[i].brandName}</td>
                        <td>
                            <a>修改</a>
                            <a class="remove">删除</a>
                        </td>
                    </tr>
                `
            }
            $('#brand-tbody').html(TB);
            $('#brand-tbody').children().addClass("def")
        } else {
            alert(res.msg)
        }
    })
}

