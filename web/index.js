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
    var _Item = function (num, key, val, isEdit) {
        this.index = num;
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
        if (key) this.key.setAttribute("value", key);
        this.val.className = "item-val";
        this.val.setAttribute("placeholder", "value");
        if (val) this.val.setAttribute("value", val);
        this.del.className = "mdui-ripple item-del";
        this.del.innerHTML = "×";
        this.item.appendChild(this.seq);
        this.item.appendChild(this.key);
        this.item.appendChild(this.val);
        this.item.appendChild(this.del);
        if (!isEdit) {
            this.key.setAttribute("disable", "disable")
            this.val.setAttribute("disable", "disable")
            this.del.setAttribute("disable", "disable")
        }
    };
    return _Item;
})();

var Items = function (div, isEdit) {
    var self = this;
    var add = document.createElement("p");
    add.className = "item mdui-ripple";
    add.innerHTML = "＋";
    add.onclick = function (e, key, val) {
        var item = new Item(arr.length + 1, key, val, isEdit);
        item.del.onclick = function () {
            self.delete(item.index);
        };
        arr.push(item);
        div.removeChild(add);
        div.appendChild(item.item);
        div.appendChild(add);
    };
    if (isEdit) div.appendChild(add);
    var arr = [];
    this.add = function (key, val) {
        add.onclick(event, key, val);
    };
    this.delete = function (index) {
        var item = arr[index - 1];
        if (item) {
            arr.splice(index - 1, 1);
            div.removeChild(item.item);
            this.refresh();
        }
    };
    this.refresh = function () {
        for (var i in arr) {
            var item = arr[i];
            item.index = (parseInt(i) + 1);
            item.seq.innerHTML = item.index;
        }
    };
    this.size = function () {
        return arr.length;
    };
    this.map = function () {
        var data = {};
        for (var i in arr) {
            var item = arr[i];
            var key = item.key.value;
            var val = item.val.value;
            data[key ? key : ""] = val ? val : "";
        }
        return data;
    }
};

var RequestParameter = (function () {
    var el = document.getElementById("Request-Parameter");
    var self = new Items(el, true);
    return self;
})();

var RequestHeader = (function () {
    var el = document.getElementById("Request-Header");
    var self = new Items(el, true);
    return self;
})();

var RequestCookie = (function () {
    var el = document.getElementById("Request-Cookie");
    var self = new Items(el, true);
    return self;
})();

var ResponseResult = (function () {
    var self = {};
    var el = document.getElementById("Response-Result");
    return self;
})();

var ResponseHeader = (function () {
    var el = document.getElementById("Response-Header");
    var self = new Items(el, false);
    return self;
})();

var Header = (function () {
    var inst = new mdui.Menu('#open', '#menu');
    document.getElementById("h-method").onclick = function () {
        inst.open();
    }
})();

// window.external.invoke(Date.now().toString());
// window.external.invoke(Date.now().toString());
// setInterval(function () {
//     window.external.invoke(Date.now().toString());
// }, 1000)