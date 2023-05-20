package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Response struct {
	Msg         string `json:"message"`
	API_version string `json:"api_version"`
	Success     bool   `json:"success"`
}

func getResponse() *Response {
	message, ok := os.LookupEnv("MESSAGE")

	if !ok {
		message = "Vegas Programmers"
	}

	return &Response{
		Msg:         fmt.Sprintf("Hello %s!", message),
		API_version: "v1.0.0",
		Success:     true,
	}
}

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		response, _ := json.Marshal(getResponse())

		w.Header().Add("Access-Control-Allow-Origin", "http://dashboard.127-0-0-1.sslip.io")
		w.Write(response)
	})

	log.Fatal(http.ListenAndServe(":80", nil))
}
