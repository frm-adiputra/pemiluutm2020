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
		BaseImportPath: "pemiluutm2020",
		DefaultSchema:  "tahap1",
	}
	return g.Generate()
}

func exitWithError(err error) {
	fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}

func generateSalt() error {
	n, err := randomNum()
	if err != nil {
		return err
	}

	d1 := []byte(n)
	err = ioutil.WriteFile("./.salt", d1, 0600)
	if err != nil {
		return err
	}

	return nil
}

func randomNum() (string, error) {
	n, err := rand.Prime(rand.Reader, 64)
	if err != nil {
		return "", err
	}
	return n.String(), nil
}
