# ------------------STORES--------------------
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/stores" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "4231",
  "storename": "gardens",
  "category": "department",
  "address": "123 Steels Avenue"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/stores" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "192",
  "storename": "One Square",
  "category": "department",
  "address": "831 Young Street"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/stores" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "431",
  "storename": "mallWart",
  "category": "department",
  "address": "83 Dawn Mills Rd"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/stores" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "133",
  "storename": "mallWart",
  "category": "department",
  "address": "405 Bloor Street"
}'

read -p $'\n\nGET all stores'
curl  "http://localhost:3000/stores" 

# read -p $'\n\nGET filtered stores (firstname: Tom, sex: M)'
# curl  "http://localhost:3000/stores?query"

read -p $'\n\nGET store by ID 192'
curl  "http://localhost:3000/store/id=/192" 

read -p $'\n\nUPDATE store by ID 192'
curl -X "PUT" "http://localhost:3000/store/id=/192" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "Two Squuare",
  "category": "clothing"
}'

read -p $'\n\nDELETE store by ID 192'
curl -X "DELETE" "http://localhost:3000/store/id=/192" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nDELETE store by ID 192'
curl -X "DELETE" "http://localhost:3000/store/id=/192" \
     -H "Content-Type: application/json; charset=utf-8"

