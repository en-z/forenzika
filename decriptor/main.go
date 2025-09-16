package main

import (
	"fmt"
	"io"
	"os"
)

func kale(key []byte, data []byte) []byte {// nasa funkcija desifrovanja
	cues := 0
	trip := 0

	out := make([]byte, len(data))

	s := make([]byte, 256)
	copy(s, key)

	for i := 0; i < len(data); i++ {
		cues = (cues + 1) & 0xFF
		trip = (trip + int(s[cues])) & 0xFF

		s[cues], s[trip] = s[trip], s[cues]

		n3 := (int(s[cues]) + int(s[trip])) & 0xFF

		out[i] = data[i] ^ s[n3]
	}

	return out
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Potreban path do fajla")
		return
	}

	inFile := os.Args[1]
	f, err := os.Open(inFile)
	if err != nil {
		return
	}
	defer f.Close()

	fileInfo, err := f.Stat()
	if err != nil {
		return
	}

	fileSize := fileInfo.Size()
	if fileSize <= 256 {
		return
	}

	buf := make([]byte, fileSize)
	_, err = io.ReadFull(f, buf)
	if err != nil {
		return
	}

	key := buf[:256]
	encryptedData := buf[256:]

	decrypted := kale(key, encryptedData)

	outFile := "sus_decrypted.bin"
	err = os.WriteFile(outFile, decrypted, 0644)//perm
	if err != nil {
		fmt.Println("err: ", err)
		return
	}

	fmt.Println("Zavrseno: ", outFile)
}

