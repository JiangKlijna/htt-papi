/**
 *
 */
(function () {
    var ms = document.getElementById("main").style;
    ms.position = "absolute";
    window.onresize = function () {
        if (window.innerWidth < 800) { // 调整为移动端样式
            ms.top = 0;
            ms.left = 0;
            ms.width = '100%';
            ms.height = '100%';
        } else { // 调整为pc端样式
            var w = window.innerWidth - 800;
            var top = parseInt(w / (window.screen.width - 800) * 60);
            ms.top = top + 'px';
            ms.left = w / 2 + 'px';
            ms.height = (window.innerHeight - top * 2) + 'px';
            ms.width = '800px';
        }
    };
    window.onresize();
})();
