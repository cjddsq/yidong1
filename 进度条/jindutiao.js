// 设计进度条和计时器
var i = 0;
function loading() {
    i++;
    document.getElementById("loadtext").innerText = i + "%";
    // 递归用法
    if (i < 100) setTimeout("loading()", 100);
}
setTimeout("loading()", 100);
//进度条判断动画是否停止并将覆盖层跳出
var d = document.getElementById("loading-1");
d.addEventListener("animationend", function () {
    document.getElementById("loadcover").style.display = "block";
});
