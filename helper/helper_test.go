package helper

import (
	"crypto/md5"
	"fmt"
	"testing"
)

func TestSaltedHash(t *testing.T) {
	expected := fmt.Sprintf("%x", (md5.Sum([]byte("123456789contohsalt"))))
	found, err := SaltedHash("123456789")

	if err != nil {
		t.Fatal(err)
	}

	if expected != found {
		t.Error("Hash result not equal")
	}
}
