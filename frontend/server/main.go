package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, rq *http.Request) {
		fmt.Println("request recieved")
		path := fmt.Sprintf("./files%s", rq.URL.Path)
		if _, err := os.Stat(path); err == nil {
			http.ServeFile(rw, rq, path)
		} else {
			http.ServeFile(rw, rq, "./files/index.html")
		}
		fmt.Println("request handled")
	})

	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	log.Fatal(http.Serve(listener, nil))
}
