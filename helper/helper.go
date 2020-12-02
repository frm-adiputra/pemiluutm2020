package helper

import (
	"crypto/md5"
	"fmt"
)

// SaltedHash akan memberikan hasil berupa nilai v yang diberi salt kemudian di-hash.
func SaltedHash(v string) (string, error) {
	bSalted := []byte(salted(v))
	bSum := md5.Sum(bSalted)
	return fmt.Sprintf("%x", bSum), nil
}
