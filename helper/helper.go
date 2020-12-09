package helper

import (
	"crypto/md5"
	"errors"
	"fmt"
	"regexp"
	"strings"
)

// HashedEmailToNim mengkonversikan data email menjadi NIM kemudian di-hash.
func HashedEmailToNim(s string) (string, error) {
	nim, err := EmailToNim(s)
	if err != nil {
		return "", err
	}

	return SaltedHash(nim)
}

// EmailToNim mengkonversikan data email menjadi NIM
func EmailToNim(s string) (string, error) {
	idx := strings.Index(s, "@")
	if idx == -1 {
		return "", errors.New("character '@' not found")
	}

	return s[0:idx], nil
}

// JenisEmail memberikan return value "student" jika dan hanya jika email
// menggunakan domain "student.trunojoyo.ac.id". Selain itu akan memberikan
// return value "bukan student".
func JenisEmail(s string) (string, error) {
	idx := strings.Index(s, "@")
	if idx == -1 {
		return "", errors.New("character '@' not found")
	}

	if s[idx+1:] == "student.trunojoyo.ac.id" {
		return "student", nil
	}

	return "bukan student", nil
}

// SaltedHash akan memberikan hasil berupa nilai v yang ditambahi salt kemudian di-hash.
func SaltedHash(v string) (string, error) {
	bSalted := []byte(salted(v))
	bSum := md5.Sum(bSalted)
	return fmt.Sprintf("%x", bSum), nil
}

// Last3UpperSaltedHash mengambil tiga karakter terakhir, dikonversikan menjadi
// huruf besar, kemudian ditambahi dengan salt dan di-hash.
func Last3UpperSaltedHash(v string) (string, error) {
	s0, err := last3Upper(v)
	if err != nil {
		return "", err
	}

	return SaltedHash(s0)
}

// AlphabetOnlyLast3UpperSaltedHash mengambil hanya karakter huruf, kemudian
// diambil tiga karakter terakhir, dikonversikan menjadi huruf besar, kemudian
// ditambahi dengan salt dan di-hash.
func AlphabetOnlyLast3UpperSaltedHash(v string) (string, error) {
	s0, err := alphabetOnly(v)
	if err != nil {
		return "", err
	}

	s1, err := last3Upper(s0)
	if err != nil {
		return "", err
	}

	return SaltedHash(s1)
}

// SingkatanFakultas mengkonversi nama fakultas menjadi singkatannya
func SingkatanFakultas(v string) (string, error) {
	up := strings.ToUpper(v)
	switch up {
	case "FAKULTAS HUKUM":
		return "FH", nil
	case "FAKULTAS EKONOMI DAN BISNIS":
		return "FEB", nil
	case "FAKULTAS PERTANIAN":
		return "FP", nil
	case "FAKULTAS TEKNIK":
		return "FT", nil
	case "FAKULTAS ILMU SOSIAL DAN ILMU BUDAYA":
		return "FISIB", nil
	case "FAKULTAS ILMU PENDIDIKAN":
		return "FIP", nil
	case "FAKULTAS KEISLAMAN":
		return "FKis", nil
	default:
		return "", fmt.Errorf("Unknown fakultas: %s", v)
	}
}

// alphabetOnly akan memberikan return value berupa string yang hanya berisi
// huruf saja dari string `v` yang menjadi inputannya.
func alphabetOnly(v string) (string, error) {
	// Gunakan Regex mengambil hanya huruf
	reg, err := regexp.Compile("[^a-zA-Z]+")
	if err != nil {
		return "", err
	}
	s := reg.ReplaceAllString(v, "")
	return s, nil
}

// last3Upper mengambil tiga karakter terakhir pada string dan mengubahnya
// menjadi huruf besar. Bila string `v` yang menjadi input memiliki panjang
// kurang dari 3 karakter, maka akan mengembalikan error.
func last3Upper(v string) (string, error) {
	if len(v) < 3 {
		return "", errors.New("String harus memiliki panjang minimal 3 karakter")
	}

	s0 := string(v[len(v)-3:])
	return strings.ToUpper(s0), nil
}
