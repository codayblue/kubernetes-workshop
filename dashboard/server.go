package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("we're starting the server")
	fmt.Println("http://<hostname>")

	http.Handle("/", http.FileServer(http.Dir("./")))
	http.ListenAndServe(":80", nil)
}
