# mongoimport --db database --collection users --drop --file users.json

# ------------------USERS--------------------
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "m1ssionP0zzible",
  "firstname": "Tom",
  "lastname": "Cruise",
  "sex": "M",
  "age": 54
}'
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "gump1994",
  "firstname": "Tam",
  "lastname": "Hanks",
  "sex": "M",
  "age": 60
}'
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "TotallyNotAFakeUser",
  "firstname": "Nigerian",
  "lastname": "Prince",
  "sex": "M",
  "age": 174
}'
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "a0rcrux",
  "firstname": "Tom",
  "lastname": "Riddle",
  "sex": "F",
  "age": 71
}'

read -p $'\n\nGET all users'
curl  "http://localhost:3000/users" 

read -p $'\n\nGET filtered users (firstname: Tom, sex: M)'
curl  "http://localhost:3000/users?firstname=Tom&sex=M"

read -p $'\n\nGET user by ID 192'
curl  "http://localhost:3000/user?id=192" 

read -p $'\n\nGET user by USERNAME m1ssionP0zzible'
curl  "http://localhost:3000/user?username=m1ssionP0zzible" 

read -p $'\n\nDELETE user by ID 192'
curl -X "DELETE" "http://localhost:3000/user?id=192" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nDELETE user by ID 192'
curl -X "DELETE" "http://localhost:3000/user?id=192" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nUPDATE user by ID 231'
curl -X "PUT" "http://localhost:3000/user?id=231" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "shouldNotChange",
  "firstname": "HongKong",
  "lastname": "Banker",
  "age": 28
}'

# ------------------STORES--------------------
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "4231",
  "storename": "gardens",
  "category": "department",
  "address": "123 Steels Avenue"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "192",
  "storename": "One Square",
  "category": "mall",
  "address": "831 Young Street"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "431",
  "storename": "mallWart",
  "category": "stuff",
  "address": "83 Dawn Mills Rd"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "133",
  "storename": "mallWart",
  "category": "stuff",
  "address": "405 Bloor Street"
}'

read -p $'\n\nGET all stores'
curl  "http://localhost:3000/stores" 

read -p $'\n\nGET filtered stores (category: stuff)'
curl  "http://localhost:3000/stores?category=stuff"

read -p $'\n\nGET store by ID 192'
curl  "http://localhost:3000/store?id=192" 

read -p $'\n\nUPDATE store by ID 133'
curl -X "PUT" "http://localhost:3000/store?id=133" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "Two Squuare",
  "category": "clothing",
  "address": "Two Road Lane"
}'

read -p $'\n\nDELETE store by ID 192'
curl -X "DELETE" "http://localhost:3000/store?id=192" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nDELETE store by ID 192'
curl -X "DELETE" "http://localhost:3000/store?id=192" \
     -H "Content-Type: application/json; charset=utf-8"


