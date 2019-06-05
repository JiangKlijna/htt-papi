package main

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
)

var client = &http.Client{}

// http request
func request(method, url string, params, header map[string]string) map[string]interface{} {
	req, err := http.NewRequest(convert_url_body(method, url, params))
	if err != nil {
		return build_response(nil, err)
	}
	for k, v := range header {
		req.Header.Add(k, v)
	}
	return build_response(client.Do(req))
}

// generate the http request parameters
func convert_url_body(method, url string, params map[string]string) (string, string, io.Reader) {
	u := url
	p := params_string(params)
	if method == "POST" || method == "PUT" {
		return method, u, p
	}
	if strings.LastIndex(u, "?") > 0 {
		u = u + "&" + p.String()
	} else {
		u = u + "?" + p.String()
	}
	return method, u, strings.NewReader("")
}

// convert key-value pairs to http parameters
func params_string(params map[string]string) *bytes.Buffer {
	buf := &bytes.Buffer{}
	for k, v := range params {
		buf.WriteString(k)
		buf.WriteByte('=')
		buf.WriteString(v)
		buf.WriteByte('&')
	}
	if buf.Len() > 0 {
		buf.Truncate(buf.Len() - 1)
	}
	return buf
}

// build  jssp.Response object with *http.Response and error
func build_response(response *http.Response, err error) map[string]interface{} {
	res := make(map[string]interface{})
	if err != nil {
		res["status"] = -1
		res["error"] = err.Error()
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		res["status"] = response.StatusCode
		res["body"] = string(data)
		res["header"] = response.Header
	}
	return res
}
