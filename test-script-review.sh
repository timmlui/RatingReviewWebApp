# ------------------USERS--------------------
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": 5313,
  "username": "xxlflameslxx",
  "firstname": "flamon",
  "lastname": "man",
  "sex": "M",
  "age": 999
}'
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": 123,
  "username": "bigboy",
  "firstname": "after",
  "lastname": "noon",
  "sex": "M",
  "age": 20
}'
read -p $'\nCREATE user'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": 4888,
  "username": "eightylitty",
  "firstname": "madam",
  "lastname": "eety",
  "sex": "F",
  "age": 26
}'
# ------------------STORES--------------------
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "631",
  "storename": "ITshop",
  "category": "hehe",
  "address": "204 hot fire"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "456",
  "storename": "frannies",
  "category": "farm",
  "address": "1 barn street"
}'
read -p $'\nCREATE store'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "555",
  "storename": "LMAO store",
  "category": "laughs",
  "address": "404 not found"
}'
# ------------------REVIEWS--------------------
read -p $'\nCreate review'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "315",
  "userID": "5313",
  "storeID": "631",
  "rating": 8,
  "comment": "If only they have some windows and macs around!"
}'
read -p $'\nCREATE review'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "123",
  "userID": "123",
  "storeID":"456",
  "rating": 0,
  "comment": "taste like toilet"
}'
read -p $'\nCREATE review'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "426",
  "userID": "4888",
  "storeID":"555",
  "rating": 10,
  "comment": "Love the supply of soylents and ice cream sandwiches on hand!"
}'
read -p $'\nCREATE review'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "152",
  "userID": "4888",
  "storeID":"631",
  "rating": 8,
  "comment": "Building is beautiful, the people inside unfortunately smell..."
}'
read -p $'\nCREATE review'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "_id": "198",
  "userID": "123",
  "storeID":"631",
  "rating": 1,
  "comment": "poop, poop poop"
}'

#--test forbidden
# read -p $'\nCREATE review but no such userID'
# curl -X "POST" "http://localhost:3000/reviews" \
#      -H "Content-Type: application/json; charset=utf-8" \
#      -d $'{
#   "_id": "160",
#   "userID": "000",
#   "storeID": "482",
#   "rating": 5,
#   "comment": ""
# }'
# read -p $'\nCREATE review but no such storeID'
# curl -X "POST" "http://localhost:3000/reviews" \
#      -H "Content-Type: application/json; charset=utf-8" \
#      -d $'{
#   "_id":"426",
#   "userID": "5313",
#   "storeID":"000",
#   "rating": 10,
#   "comment": "Love the supply of soylents and ice cream sandwiches on hand!"
# }'
# read -p $'\nCREATE review but there exists a review by userID of storeID already'
# curl -X "POST" "http://localhost:3000/reviews" \
#      -H "Content-Type: application/json; charset=utf-8" \
#      -d $'{
#   "_id":"152",
#   "userID": "5313",
#   "storeID":"631",
#   "rating": 1,
#   "comment": "whats that smell??!??!?"
# }'
# read -p $'\nCREATE review but rating invalid'
# curl -X "POST" "http://localhost:3000/reviews" \
#      -H "Content-Type: application/json; charset=utf-8" \
#      -d $'{
#   "_id":"549",
#   "userID": "5313",
#   "storeID":"631",
#   "rating": 11,
#   "comment": "Love the supply of soylents and ice cream sandwiches on hand!"
# }'

read -p $'\n\nGET review ID 123'
curl  "http://localhost:3000/review?id=123" 

read -p $'\n\nGET review of STOREID 631'
curl  "http://localhost:3000/review?storeid=631" 

read -p $'\n\nGET review USERID 4888'
curl  "http://localhost:3000/review?userid=4888" 

read -p $'\n\nDELETE review ID 152'
curl -X "DELETE" "http://localhost:3000/review?id=152" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nDELETE review of storeID 555'
curl -X "DELETE" "http://localhost:3000/review?storeid=555" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nDELETE review by userID 123'
curl -X "DELETE" "http://localhost:3000/review?userid=123" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\n\nUPDATE review ID 315'
curl -X "PUT" "http://localhost:3000/review?id=315" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "userID": "42",
  "rating": "10",
  "comment": "hell yeahhhhh"
}'

read -p $'\n\nDELETE store by ID 631'
curl -X "DELETE" "http://localhost:3000/store?id=631" \
     -H "Content-Type: application/json; charset=utf-8"
