package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
)

func main() {
	tempDir := os.TempDir()

	pattern := regexp.MustCompile(`^[0-9]{1}[0-9]{13}\.exe$`)//regex za [id]{timestamp}.exe

	files, err := os.ReadDir(tempDir)
	if err != nil {
		fmt.Println("Greška temp foldera:", err)
		return
	}

	for _, file := range files {
		if file.IsDir() {
			continue 
		}

		fileName := file.Name()

		if pattern.MatchString(fileName) {
			fullPath := filepath.Join(tempDir, fileName)

			err := os.Remove(fullPath)
			if err != nil {
				fmt.Printf("Greška pri brisanju %s: %v\n", fullPath, err)
			} else {
				fmt.Printf("Obrisano: %s\n", fullPath)
			}
		}
	}
}


