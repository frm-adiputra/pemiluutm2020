package helper

import (
	"testing"
)

func TestAlphabetOnly(t *testing.T) {
	params := []string{
		"Pemilu 2020 UTM!",
		"  Pemilu 2020 UTM! ",
		"@#  P$7e&m,il.u 20,20 U.T.M! ",
	}
	expected := "PemiluUTM"
	for _, v := range params {
		found, err := alphabetOnly(v)
		if err != nil {
			t.Errorf("Should not be error on params '%s': %s", v, err)
		} else {
			if found != expected {
				t.Errorf("On input '%s', found '%s', expected '%s'", v, found, expected)
			}
		}
	}
}

func TestLast3Upper(t *testing.T) {
	params := []string{
		"abcdef",
		"ABCDEF",
		"AbCdEf",
		"aBcDeF",
	}
	expected := "DEF"
	for _, v := range params {
		found, err := last3Upper(v)
		if err != nil {
			t.Errorf("Should not be error on params '%s': %s", v, err)
		} else {
			if found != expected {
				t.Errorf("On input '%s', found '%s', expected '%s'", v, found, expected)
			}
		}
	}
}

func TestLast3UpperError(t *testing.T) {
	params := []string{
		"",
		"A",
		"Ab",
	}
	for _, v := range params {
		_, err := last3Upper(v)
		if err == nil {
			t.Errorf("Should be returning error on params '%s'", v)
		}
	}
}

func TestEmailToNim(t *testing.T) {
	params := []string{
		"123456789012@trunojoyo.ac.id",
		"123456789012@student.trunojoyo.ac.id",
		"saya@trunojoyo.ac.id",
		"saya@student.trunojoyo.ac.id",
		"mereka@gmail.com",
	}
	expecteds := []string{
		"123456789012",
		"123456789012",
		"saya",
		"saya",
		"mereka",
	}
	for i := 0; i < len(params); i++ {
		v := params[i]
		expected := expecteds[i]

		found, err := EmailToNim(v)
		if err != nil {
			t.Errorf("Should not be error on params '%s': %s", v, err)
		} else {
			if found != expected {
				t.Errorf("On input '%s', found '%s', expected '%s'", v, found, expected)
			}
		}
	}
}

func TestEmailToNimError(t *testing.T) {
	params := []string{
		"",
		"A",
		"Ab",
		"Ab.com",
	}
	for _, v := range params {
		_, err := EmailToNim(v)
		if err == nil {
			t.Errorf("Should be returning error on params '%s'", v)
		}
	}
}

func TestJenisEmail(t *testing.T) {
	params := []string{
		"123456789012@trunojoyo.ac.id",
		"123456789012@student.trunojoyo.ac.id",
		"saya@trunojoyo.ac.id",
		"saya@student.trunojoyo.ac.id",
		"mereka@gmail.com",
		"mereka@",
	}
	expecteds := []string{
		"bukan student",
		"student",
		"bukan student",
		"student",
		"bukan student",
		"bukan student",
	}
	for i := 0; i < len(params); i++ {
		v := params[i]
		expected := expecteds[i]

		found, err := JenisEmail(v)
		if err != nil {
			t.Errorf("Should not be error on params '%s': %s", v, err)
		} else {
			if found != expected {
				t.Errorf("On input '%s', found '%s', expected '%s'", v, found, expected)
			}
		}
	}
}

func TestJenisEmailError(t *testing.T) {
	params := []string{
		"",
		"A",
		"Ab",
		"Ab.com",
	}
	for _, v := range params {
		_, err := JenisEmail(v)
		if err == nil {
			t.Errorf("Should be returning error on params '%s'", v)
		}
	}
}

func TestSingkatanFakultas(t *testing.T) {
	params := []string{
		"Fakultas Hukum",
		"Fakultas Ekonomi dan Bisnis",
		"Fakultas Pertanian",
		"Fakultas Teknik",
		"Fakultas Ilmu Sosial dan Ilmu Budaya",
		"Fakultas Ilmu Pendidikan",
		"Fakultas Keislaman",
	}
	expecteds := []string{
		"FH",
		"FEB",
		"FP",
		"FT",
		"FISIB",
		"FIP",
		"FKis",
	}

	for i := 0; i < len(params); i++ {
		v := params[i]
		expected := expecteds[i]

		found, err := SingkatanFakultas(v)
		if err != nil {
			t.Errorf("Should not be error on params '%s': %s", v, err)
		} else {
			if found != expected {
				t.Errorf("On input '%s', found '%s', expected '%s'", v, found, expected)
			}
		}
	}
}

func TestSingkatanFakultasError(t *testing.T) {
	params := []string{
		"Any fakultas",
	}
	for _, v := range params {
		_, err := SingkatanFakultas(v)
		if err == nil {
			t.Errorf("Should be returning error on params '%s'", v)
		}
	}
}
