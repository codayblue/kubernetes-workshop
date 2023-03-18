package main

import (
	"fmt"
	"net/http"
)

func mockApiHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	fmt.Fprint(w, "{\"success\": true}")
}

func main() {
	fmt.Println("we're starting the server")
	fmt.Println("http://<hostname>")

	fileServerInstance := http.FileServer(http.Dir("./"))

	http.HandleFunc("/api/v1/mock", mockApiHandler)
	http.Handle("/", fileServerInstance)
	http.ListenAndServe(":80", nil)
}
