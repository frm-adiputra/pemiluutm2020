package helper

import (
	"fmt"
	"io/ioutil"
	"strings"
)

var salt string

func init() {
	bSalt, err := ioutil.ReadFile("./.salt")
	if err != nil {
		panic(err)
	}
	salt = strings.TrimSpace(string(bSalt))
	fmt.Println(salt)
}

func salted(s string) string {
	return s + salt
}
