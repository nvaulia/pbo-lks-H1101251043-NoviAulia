
#!/bin/bash

BASE_URL="http://localhost:8000/api/books"

echo "== Test 1: GET semua buku =="
curl -sS "$BASE_URL" | jq .

echo ""
echo "== Test 2: POST buku baru =="

RESPONSE=$(curl -sS -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"judul":"Buku Otomatis","penulis":"Novi Aulia","tahun":2020,"stok":5}')

echo "$RESPONSE" | jq .

BOOK_ID=$(echo "$RESPONSE" | jq -r '.data.id')

echo "ID baru: $BOOK_ID"

echo ""
echo "== Test 3: GET buku ID $BOOK_ID =="

curl -sS "$BASE_URL/$BOOK_ID" | jq .

echo ""
echo "== Test 4: PUT ubah buku =="

curl -sS -X PUT "$BASE_URL/$BOOK_ID" \
  -H "Content-Type: application/json" \
  -d '{"judul":"Buku Otomatis Revisi","penulis":"Novi Aulia","tahun":2021,"stok":10}' | jq .

echo ""
echo "== Test 5: DELETE buku =="

curl -sS -X DELETE "$BASE_URL/$BOOK_ID" | jq .

echo ""
echo "== Test 6: Validasi error =="

curl -sS -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"judul":""}' | jq .

echo ""
echo "== Semua pengujian selesai =="
