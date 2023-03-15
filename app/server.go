package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("we're starting the server")
	fmt.Println("http://localhost:8089")

	http.Handle("/", http.FileServer(http.Dir("./")))
	http.ListenAndServe(":8089", nil)
}