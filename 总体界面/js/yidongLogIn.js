$(document).ready(function(){
    var cookie = cookieUtil.get('userinfo');
    var cookieValueObj = JSON.parse(cookie);

    if (cookieValueObj){
        $.ajax({
            url: 'http://123.207.52.59:8088/login',
            data: 'account=' + cookieValueObj.account + '&password=' + cookieValueObj.password,
            dataType: 'json',
            async: true,
            type: "POST",
            success: function(data){
                if (data.status){
                    $('#log_in_area').fadeToggle(1000);
                    $('#user_name').html(data.data.userName);
                    setTimeout(function(){
                        $('#user_info_area').animate({
                            opacity: '0.8',
                        }, 1000);
                    }, 1000);
                } else{
                    alert('登录失败！');
                }
            }
        })
    }
});

$('.input').blur(function(){
    if ($(this).index() == 0){
        $(this).attr('placeholder', '用户名');
    } else {
        $(this).attr('placeholder', '﹡﹡﹡﹡﹡﹡﹡');
    }
});

$('.input').focus(function(){
    $(this).attr('placeholder', ' ');
})

$('#log_in_button').click(function(){
    var account = $('#account'),
        password = $('#password');

    if ((!account.val() || account.val() == ' ') && (!password.val() || password.val() == ' ')){
        alert('请输入用户名及密码！');
        return false;
    } else if ((!account.val() || account.val() == ' ') && (password.val() && password.val() != ' ')){
        alert('用户名不能为空！');
        return false;
    } else if ((account.val() && account.val() != ' ') && (!password.val() || password.val() == ' ')){
        alert('密码不能为空！');
        return false;
    } else if ((account.val() && account.val() != ' ') && (password.val() && password.val() != ' ')){
        var account_patt = /^[A-Za-z0-9]+$/,
            password_patt = /^[A-Za-z0-9]{6,16}$/;

        if (!account_patt.test(account.val()) && password_patt.test(password.val())){
            alert("用户名只能由英文字符和数字构成且不能有空格！");
            return false;
        } else if (account_patt.test(account.val()) && !password_patt.test(password.val())){
            alert("密码只能由英文字符和数字构成且长度为6~16！");
            return false;
        } else if (!account_patt.test(account.val()) && !password_patt.test(password.val())){
            alert("用户名只能由英文字符和数字构成且不能有空格！\n密码只能由英文字符和数字构成且长度为6~16！");
            return false;
        }
    }

    if ($('#checkbox').prop('checked')){
        var cookieValueObj = {
            account : account.val(),
            password : password.val()
        }    

        var time = new Date();
        time.setDate(time.getDate() + 7);

        cookieUtil.set('userinfo', JSON.stringify(cookieValueObj), time, '/');
    }
});

$('#log_in_form').submit(function(){
    var account = $('#account').val(),
        password = $('#password').val();

    $.ajax({
            url: 'http://123.207.52.59:8088/login',
            data: 'account=' + account + '&password=' + password,
            dataType: 'json',
            async: true,
            type: "POST",
            success: function(data){
                if (data.status){
                    $('#log_in_area').fadeToggle(1000);
                    $('#user_name').html(data.data.userName);
                    setTimeout(function(){
                        $('#user_info_area').animate({
                            opacity: '0.8',
                        }, 1000);
                    }, 1000);
                } else{
                    alert('登录失败！');
                }
            }
        })
    
    return false;
});

$('#log_out_button').click(function(){
    cookieUtil.unset('userinfo', '/');
    location.reload();
});