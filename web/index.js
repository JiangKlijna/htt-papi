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
/**
 *
 <p class="item">
 <button class="mdui-ripple item-seq">1</button><input class="item-key" placeholder="key"><input class="item-val" placeholder="value"><button class="mdui-ripple item-del">×</button>
 </p>
 *
 */

var Item = (function () {
    var _Item = function (num) {
        this.item = document.createElement("p");
        this.seq = document.createElement("button");
        this.key = document.createElement("input");
        this.val = document.createElement("input");
        this.del = document.createElement("button");

        this.item.className = "item";
        this.seq.className = "mdui-ripple item-seq";
        this.seq.innerHTML = num;
        this.key.className = "item-key";
        this.key.setAttribute("placeholder", "key");
        this.val.className = "item-val";
        this.val.setAttribute("placeholder", "value");
        this.del.className = "mdui-ripple item-del";
        this.del.innerHTML = "×";
        this.item.appendChild(this.seq);
        this.item.appendChild(this.key);
        this.item.appendChild(this.val);
        this.item.appendChild(this.del);
    };
    return _Item;
})();

var Items = function () {
    var arr = [];
    this.add = function () {
        arr.push(new Item(arr.length + 1));
    };
    this.size = function () {
        return arr.length;
    };
    this.map = function () {

    }
};

var RequestParameter = (function () {
    var self = new Items();
    var el = document.getElementById("Request-Parameter");
    el.prepend(new Item(3).item);
    el.prepend(new Item(2).item);
    el.prepend(new Item(1).item);
    return self;
})();

var RequestHeader = (function () {
    var self = new Items();
    var el = document.getElementById("Request-Header");
    el.prepend(new Item(3).item);
    el.prepend(new Item(2).item);
    el.prepend(new Item(1).item);
    return self;
})();

var ResponseResult = (function () {
    var self = {};
    var el = document.getElementById("Response-Result");
    return self;
})();

var ResponseHeader = (function () {
    var self = new Items();
    var el = document.getElementById("Response-Header");
    el.prepend(new Item(3).item);
    el.prepend(new Item(2).item);
    el.prepend(new Item(1).item);
    return self;
})();