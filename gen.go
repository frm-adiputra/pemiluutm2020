// +build ignore
// This program generates codes for data processing.
// It must be invoked by running go generate

package main

import (
	"crypto/rand"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/frm-adiputra/csv2postgres"
)

func main() {
	if len(os.Args) > 1 {
		if os.Args[1] == "salt" {
			if err := generateSalt(); err != nil {
				exitWithError(err)
			}
		}
	} else {
		if err := generateConversionCode(); err != nil {
			exitWithError(err)
		}
	}
}

func generateConversionCode() error {
	g := csv2postgres.Generator{
		BaseImportPath: "github.com/kpumutm/pemiluutm2020",
		DefaultSchema:  "pemiluutm2020",
	}
	return g.Generate()
}

func exitWithError(err error) {
	fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}

const saltCode = `
package helper

func salt(s string) string {
	return s + "{{ .RandomNum }}"
}
`

func generateSalt() error {
	// t := template.Must(template.New("saltCode").Parse(saltCode))

	n, err := randomNum()
	if err != nil {
		return err
	}

	fmt.Println(n)

	d1 := []byte(n)
	err = ioutil.WriteFile("./.salt", d1, 0600)
	if err != nil {
		return err
	}

	return nil

	// f, err := os.Create("./.salt")
	// if err != nil {
	// 	fmt.Println("[FAILED]")
	// 	return err
	// }
	// defer f.Close()

	// type Data struct {
	// 	RandomNum string
	// }

	// n, err := randomNum()
	// if err != nil {
	// 	return err
	// }

	// var data = Data{n}

	// return t.Execute(f, data)
}

func randomNum() (string, error) {
	n, err := rand.Prime(rand.Reader, 64)
	if err != nil {
		return "", err
	}
	return n.String(), nil
}
