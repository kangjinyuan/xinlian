var code;

//验证码登录
function createCode() {
	code = new Array();
	var codeLength = 4; //验证码的长度
	var checkCode = document.getElementById("checkCode");
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	for(var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 32);
		code += selectChar[charIndex];
	}
	if(code.length != codeLength) {
		createCode();
	}
	checkCode.innerHTML = code;
}

window.onkeydown = function(ev) {
	var ev = ev || window.event;
	if(ev.keyCode == 13) {
		if($("#login_btn").attr("onclick")) {
			login();
		}
	};
}

function bindLoginBtn() {
	if($("#account").val() == "" || $("#password").val() == "" || $("#inputCode").val() == "") {
		$("#login_btn").removeClass("login-abled-btn").attr("onclick", "");
	} else {
		$("#login_btn").addClass("login-abled-btn").attr("onclick", "login();");
	}
}

//登录方法
function login() {
	var timestamp = new Date().getTime();
	var inputCode = $("#inputCode").val().toUpperCase();
	if(inputCode != code) {
		layer.msg("验证码输入错误！");
		return false;
	}
	var param = {
		account: $('#account').val(),
		password: $("#password").val()
	}
	request('POST', '/account/manager/login.do', param, true, function(res) {
		window.localStorage.setItem("accountInfo", JSON.stringify(res.data));
		window.location.href = "main.html?timestamp=" + timestamp;
	}, function(res) {
		if(res.code == "0005") {
			layer.msg("您的用户名或密码不正确");
		} else {
			layer.msg("登录失败，请检查网络或重试");
		}
	})

}