package main

import (
	"log"
	"net/http"
)

func main() {
	log.Println("Застолье готово: http://localhost:8080")
	log.Fatal(http.ListenAndServe("localhost:8080", http.FileServer(http.Dir("static"))))
}
