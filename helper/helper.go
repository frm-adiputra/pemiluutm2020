package helper

import (
	"crypto/md5"
	"errors"
	"fmt"
	"strings"
)

func HashedNim(s string) (string, error) {
	nim, err := EmailToNim(s)
	if err != nil {
		return "", err
	}

	return SaltedHash(nim)
}

// EmailToNim convert email to NIM
func EmailToNim(s string) (string, error) {
	idx := strings.Index(s, "@")
	if idx == -1 {
		return "", errors.New("character '@' not found")
	}

	return s[0:idx], nil
}

// SaltedHash akan memberikan hasil berupa nilai v yang diberi salt kemudian di-hash.
func SaltedHash(v string) (string, error) {
	bSalted := []byte(salted(v))
	bSum := md5.Sum(bSalted)
	return fmt.Sprintf("%x", bSum), nil
}
