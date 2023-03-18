package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	Msg         string `json:"message"`
	API_version string `json:"api_version"`
}

func getResponse() *Response {
	return &Response{
		Msg:         "Hello World!",
		API_version: "v0.0.1",
	}
}

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		response, _ := json.Marshal(getResponse())

		w.Write(response)
	})

	log.Fatal(http.ListenAndServe(":80", nil))
}
