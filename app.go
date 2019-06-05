package main

import (
	"github.com/zserge/webview"
	"path/filepath"
	"time"
)

const TAG = "htt-papi"
const WIDTH = 800
const HEIGHT = 600

func main() {
	absfs, err := filepath.Abs("./web/index.html")
	if err != nil {
		println(err.Error())
	}
	w := webview.New(webview.Settings{TAG, absfs, WIDTH, HEIGHT, true, false, callback})
	w.Run()
	time.Sleep(1000)
	w.SetFullscreen(true)
}

func callback(wv webview.WebView, p string) {
	println(p)
}
