$(document).ready(function() {
  
  var $wrapper = $('.tab-wrapper'),
      $allTabs = $wrapper.find('.tab-content > div'),
      $tabMenu = $wrapper.find('.tab-menu li'),
      $line = $('<div class="line"></div>').appendTo($tabMenu);
  
  $allTabs.not(':first-of-type').hide();  
  $tabMenu.filter(':first-of-type').find(':first').width('100%')
  
  $tabMenu.each(function(i) {
    $(this).attr('data-tab', 'tab'+i);
  });
  
  $allTabs.each(function(i) {
    $(this).attr('data-tab', 'tab'+i);
  });
  
  $tabMenu.on('click', function() {
    
    var dataTab = $(this).data('tab'),
        $getWrapper = $(this).closest($wrapper);
    
    $getWrapper.find($tabMenu).removeClass('active');
    $(this).addClass('active');
    
    $getWrapper.find('.line').width(0);
    $(this).find($line).animate({'width':'100%'}, 'fast');
    $getWrapper.find($allTabs).hide();
    $getWrapper.find($allTabs).filter('[data-tab='+dataTab+']').show();
  });
});

/*$('button').on('click', function(e) {
  e.preventDefault();
});*/

/*############################ USERS ###########################*/
function createUser(){
  $('#create-user-result-1').remove();
  $.ajax({
    url: "/user",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "username": $('#username').val(),
      "firstname": $('#firstname').val(),
      "lastname": $('#lastname').val(),
      "sex": $('#sex').val(),
      "age": parseInt($('#age').val())
    }),
    error : function(err, response){ //dont know why but only error shows response
      /*alert(err.status);*/
      var result;
      $('#create-user-result').append('<div id="create-user-result-1"></div>');
      if (err.status == 200){
        result = "success";
        $('#username').val('');
        $('#firstname').val('');
        $('#lastname').val('');
        $('#sex').val('');
        $('#age').val('');
      } else {
        result = "username already exists or is not provided";
        $('#username').val(''); //only clear username field
      }
      $('#create-user-result-1').append(result);
    }
  });
};


function getUsers(){
  $('#get-users-results1-1').remove();
  $.ajax({
   url: "/users",
   type: "GET",
   success : function(response){
    var all_users = response.users;
    $('#get-users-results1').append('<div id="get-users-results1-1"></div>');
    $('#get-users-results1-1').append('<table id="all_users" align="center"></table>');
    $('#all_users').append('<tr><th>_id</th><th>username</th><th>firstname</th><th>lastname</th><th>sex</th><th>age</th></tr>');
    /*console.log(all_users.length);*/
    for (let i = 0; i < all_users.length; i++){
     /*console.log(all_users[i]._id);*/
     var tr = "<tr>";
     var td1 = "<td>" + all_users[i]._id+"</td>";
     var td2 = "<td>" + all_users[i].username+"</td>";
     var td3 = "<td>" + all_users[i].firstname+"</td>";
     var td4 = "<td>" + all_users[i].lastname+"</td>";
     var td5 = "<td>" + all_users[i].sex+"</td>";
     var td6 = "<td>" + all_users[i].age+"</td>";

     $('#all_users').append(tr+td1+td2+td3+td4+td5+td6);
    }
   }
  });
 };

 function filterUsers(){
  $('#get-users-results2-1').remove();
  var fname = $('#filter_fname').val();
  var lname = $('#filter_lname').val();
  var sex = $('#filter_sex').val();
  var age = $('#filter_age').val();
  if (fname != '') {
    var filter1 = "firstname=" + fname;
  } else {filter1 = fname;}
  if (lname != '') {
    var filter2 = "&lastname=" + lname;
  } else {filter2 = lname;}
  if (sex != '') {
    var filter3 = "&sex=" + sex;
  } else {filter3 = sex;}
  if (age != '') {
    var filter4 = "&age=" + age;
  } else {filter4 = age;}
  $.ajax({
   url: "/users?" + filter1 + filter2 + filter3 + filter4,
   type: "GET",
   success : function(response){
    var filtered_users = response.users;
    $('#get-users-results2').append('<div id="get-users-results2-1"></div>');
    $('#get-users-results2-1').append('<table id="filtered_users" align="center"></table>');
    $('#filtered_users').append('<tr><th>_id</th><th>username</th><th>firstname</th><th>lastname</th><th>sex</th><th>age</th></tr>');
    /*console.log(filtered_users.length);*/
    for (let i = 0; i < filtered_users.length; i++){
     /*console.log(filtered_users[i]._id);*/
     var tr = "<tr>";
     var td1 = "<td>" + filtered_users[i]._id+"</td>";
     var td2 = "<td>" + filtered_users[i].username+"</td>";
     var td3 = "<td>" + filtered_users[i].firstname+"</td>";
     var td4 = "<td>" + filtered_users[i].lastname+"</td>";
     var td5 = "<td>" + filtered_users[i].sex+"</td>";
     var td6 = "<td>" + filtered_users[i].age+"</td>";

     $('#filtered_users').append(tr+td1+td2+td3+td4+td5+td6);
    }
   }
  });
 };
 function clearFilters(){
  // clear all the fields
  $('#filter_fname').val('');
  $('#filter_lname').val('');
  $('#filter_sex').val('');
  $('#filter_age').val('');
 }

function getUserByID(){
  $('#get-user-result1-1').remove();
  var uid = $('#get_uid').val();
  if (uid != '') { // if input field is not empty
    $.ajax({
      url: "/user?id=" + uid,
      type: "GET",
      success : function(response){
        var user = response.user;
        $('#get-user-result1').append('<table id="get-user-result1-1" align="center"></table>');
        $('#get-user-result1-1').append('<tr><th>_id</th><th>username</th><th>firstname</th><th>lastname</th><th>sex</th><th>age</th></tr>');
        var tr = "<tr>";
        var td1 = "<td>" + user[0]._id+"</td>";
        var td2 = "<td>" + user[0].username+"</td>";
        var td3 = "<td>" + user[0].firstname+"</td>";
        var td4 = "<td>" + user[0].lastname+"</td>";
        var td5 = "<td>" + user[0].sex+"</td>";
        var td6 = "<td>" + user[0].age+"</td>";

        $('#get-user-result1-1').append(tr+td1+td2+td3+td4+td5+td6);
      },
      error : function(err, response){
        $('#get-user-result1').append('<div id="get-user-result1-1"></div>');
        $('#get-user-result1-1').append('user does not exist');
      }
    });
    $('#get_uid').val('');
  }
};

function getUserByUsername(){
  $('#get-user-result2-1').remove();
  var username = $('#get_username').val();
  if (username != '') { // if input field is not empty
    $.ajax({
      url: "/user?username=" + username,
      type: "GET",
      success : function(response){
        var user = response.user;
        $('#get-user-result2').append('<table id="get-user-result2-1" align="center"></table>');
        $('#get-user-result2-1').append('<tr><th>_id</th><th>username</th><th>firstname</th><th>lastname</th><th>sex</th><th>age</th></tr>');
        var tr = "<tr>";
        var td1 = "<td>" + user[0]._id+"</td>";
        var td2 = "<td>" + user[0].username+"</td>";
        var td3 = "<td>" + user[0].firstname+"</td>";
        var td4 = "<td>" + user[0].lastname+"</td>";
        var td5 = "<td>" + user[0].sex+"</td>";
        var td6 = "<td>" + user[0].age+"</td>";

        $('#get-user-result2-1').append(tr+td1+td2+td3+td4+td5+td6);
      },
      error : function(err, response){
        $('#get-user-result2').append('<div id="get-user-result2-1"></div>');
        $('#get-user-result2-1').append('user does not exist');
      }
    });
    $('#get_username').val('');
  }
};

function updateUser(){
  $('#update-user-result-1').remove();
  var uid = $('#user_id_update').val();
  var username = $('#username_update').val();
  var firstname = $('#firstname_update').val();
  var lastname = $('#lastname_update').val();
  var sex = $('#sex_update').val();
  var age = $('#age_update').val();
  if (uid != '') {
    if (firstname != '' || lastname != '' || sex != '' || age != ''){
      $.ajax({
        url: "/user?id=" + uid,
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "username": username,
          "firstname": firstname,
          "lastname": lastname,
          "sex": sex,
          "age": parseInt(age)
        }),
        error : function(err, response){
          /*alert(err.status);*/
          var result;
          $('#update-user-result').append('<div id="update-user-result-1"></div>');
          if (err.status == 200){
            result = "success";
            $('#user_id_update').val(''); // clear all fields
            $('#username_update').val('');
            $('#firstname_update').val('');
            $('#lastname_update').val('');
            $('#sex_update').val('');
            $('#age_update').val('');
          } else {
            result = "user does not exist";
            $('#user_id_update').val(''); //only clear userID field
          }
          $('#update-user-result-1').append(result);
        }
      });
    }
  }
};

function deleteUser(){
  $('#del-user-result-1').remove();
  var uid = $('#del_id').val();
  $.ajax({
    url: "/user?id=" + uid,
    type: "DELETE",
    success : function(err, response){
      $('#del-user-result').append('<div id="del-user-result-1"></div>');
      $('#del-user-result-1').append(response);
    },
    error : function(err, response){
      $('#del-user-result').append('<div id="del-user-result-1"></div>');
      $('#del-user-result-1').append('user not found');
    }
  });
  $('#del_id').val('');
};

/*############################ STORES ###########################*/
function createStore(){
  $('#create-store-result-1').remove();
  $.ajax({
    url: "/store",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "storename": $('#storename').val(),
      "category": $('#category').val(),
      "address": $('#address').val()
    }),
    success : function(response) {
      alert("actually works")
    }, 
    error : function(err, response){ //dont know why but only error shows response
      /*alert(err.status);*/
      var result;
      $('#create-store-result').append('<div id="create-store-result-1"></div>');
      if (err.status == 200){
        result = "success";
        $('#storename').val('');
        $('#category').val('');
        $('#address').val('');
      } else {
        result = "storename not provided";
        $('#storename').val(''); //only clear storename field
      }
      $('#create-store-result-1').append(result);
    }
  });
};


function getStores(){
  $('#get-stores-results1-1').remove();
  $.ajax({
   url: "/stores",
   type: "GET",
   success : function(response){
    var all_stores = response.stores;
    $('#get-stores-results1').append('<div id="get-stores-results1-1"></div>');
    $('#get-stores-results1-1').append('<table id="all_stores" align="center"></table>');
    $('#all_stores').append('<tr><th>_id</th><th>storename</th><th>category</th><th>address</th></tr>');
    /*console.log(all_stores.length);*/
    for (let i = 0; i < all_stores.length; i++){
     /*console.log(all_stores[i]._id);*/
     var tr = "<tr>";
     var td1 = "<td>" + all_stores[i]._id+"</td>";
     var td2 = "<td>" + all_stores[i].storename+"</td>";
     var td3 = "<td>" + all_stores[i].category+"</td>";
     var td4 = "<td>" + all_stores[i].address+"</td>";

     $('#all_stores').append(tr+td1+td2+td3+td4);
    }
   }
  });
 };

 function filterStores(){
  $('#get-stores-results2-1').remove();
  var sname = $('#filter_sname').val();
  var category = $('#filter_cat').val();
  if (sname != '') {
    var filter1 = "storename=" + sname;
  } else {filter1 = sname;}
  if (category != '') {
    var filter2 = "&category=" + category;
  } else {filter2 = category;}
  $.ajax({
   url: "/stores?" + filter1 + filter2,
   type: "GET",
   success : function(response){
    var filtered_stores = response.stores;
    $('#get-stores-results2').append('<div id="get-stores-results2-1"></div>');
    $('#get-stores-results2-1').append('<table id="filtered_stores" align="center"></table>');
    $('#filtered_stores').append('<tr><th>_id</th><th>storename</th><th>category</th><th>address</th></tr>');
    /*console.log(filtered_stores.length);*/
    for (let i = 0; i < filtered_stores.length; i++){
     /*console.log(filtered_stores[i]._id);*/
     var tr = "<tr>";
     var td1 = "<td>" + filtered_stores[i]._id+"</td>";
     var td2 = "<td>" + filtered_stores[i].storename+"</td>";
     var td3 = "<td>" + filtered_stores[i].category+"</td>";
     var td4 = "<td>" + filtered_stores[i].address+"</td>";

     $('#filtered_stores').append(tr+td1+td2+td3+td4);
    }
   }
  });
 };
 function clearFilters2(){
  // clear all the fields
  $('#filter_sname').val('');
  $('#filter_cat').val('');
 }

function getStoreByID(){
  $('#get-store-result1-1').remove();
  var sid = $('#get_sid').val();
  if (sid != '') { // if input field is not empty
    $.ajax({
      url: "/store?id=" + sid,
      type: "GET",
      success : function(response){
        var store = response.store;
        $('#get-store-result1').append('<table id="get-store-result1-1" align="center"></table>');
        $('#get-store-result1-1').append('<tr><th>_id</th><th>storename</th><th>category</th><th>address</th></tr>');
        var tr = "<tr>";
        var td1 = "<td>" + store[0]._id+"</td>";
        var td2 = "<td>" + store[0].storename+"</td>";
        var td3 = "<td>" + store[0].category+"</td>";
        var td4 = "<td>" + store[0].address+"</td>";

        $('#get-store-result1-1').append(tr+td1+td2+td3+td4);
      },
      error : function(err, response){
        $('#get-store-result1').append('<div id="get-store-result1-1"></div>');
        $('#get-store-result1-1').append('store does not exist');
      }
    });
    $('#get_sid').val('');
  }
};

function updateStore(){
  $('#update-store-result-1').remove();
  var sid = $('#store_id_update').val();
  var storename = $('#storename_update').val();
  var category = $('#category_update').val();
  var address = $('#address_update').val();
  if (sid != '') {
    if (storename != '' || category != '' || address != '') {
      $.ajax({
        url: "/store?id=" + sid,
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "storename": storename,
          "category": category,
          "address": address
        }),
        error : function(err, response){
          /*alert(err.status);*/
          var result;
          $('#update-store-result').append('<div id="update-store-result-1"></div>');
          if (err.status == 200){
            result = "success";
            $('#store_id_update').val(''); // clear all fields
            $('#storename_update').val('');
            $('#category_update').val('');
            $('#address_update').val('');
          } else {
            result = "store does not exist";
            $('#store_id_update').val(''); //only clear storeID field
          }
          $('#update-store-result-1').append(result);
        }
      });
    }
  }
};

function deleteStore(){
  $('#del-store-result-1').remove();
  var sid = $('#del_sid').val();
  $.ajax({
    url: "/store?id=" + sid,
    type: "DELETE",
    success : function(err, response){
      $('#del-store-result').append('<div id="del-store-result-1"></div>');
      $('#del-store-result-1').append(response);
    },
    error : function(err, response){
      $('#del-store-result').append('<div id="del-store-result-1"></div>');
      $('#del-store-result-1').append('store not found');
    }
  });
  $('#del_sid').val('');
};

/*############################ REVIEWS ###########################*/
function createReview(){
  $('#create-review-result-1').remove();
  $.ajax({
    url: "/review",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "userID": $('#userID').val(),
      "storeID": $('#storeID').val(),
      "rating": parseInt($('#rating').val()),
      "comment": $('#comment').val()
    }),
    error : function(err, response){ //dont know why but only error shows response
      /*alert(err.status);*/
      var result;
      $('#create-review-result').append('<div id="create-review-result-1"></div>');
      if (err.status == 200){
        result = "success";
        $('#userID').val('');
        $('#storeID').val('');
        $('#rating').val('');
        $('#comment').val('');
      } else {
        result = "invalid<br>please check the following:<br><div class='review_error'>- both userID and storeID are valid<br>- rating is from 0 to 10 inclusive<br>- the combination of userID and storeID review already exists</div>";
      }
      $('#create-review-result-1').append(result);
    }
  });
};

function getReviewByRID(){
  $('#get-review-result1-1').remove();
  var rid = $('#get_rid').val();
  if (rid != '') { // if input field is not empty
    $.ajax({
      url: "/review?id=" + rid,
      type: "GET",
      success : function(response){
        var review = response.reviews;
        $('#get-review-result1').append('<table id="get-review-result1-1" align="center"></table>');
        $('#get-review-result1-1').append('<tr><th>_id</th><th>userID</th><th>storeID</th><th>rating</th><th>comment</th></tr>');
        var tr = "<tr>";
        var td1 = "<td>" + review[0]._id+"</td>";
        var td2 = "<td>" + review[0].userID+"</td>";
        var td3 = "<td>" + review[0].storeID+"</td>";
        var td4 = "<td>" + review[0].rating+"</td>";
        var td5 = "<td>" + review[0].comment+"</td>";

        $('#get-review-result1-1').append(tr+td1+td2+td3+td4+td5);
      },
      error : function(err, response){
        $('#get-review-result1').append('<div id="get-review-result1-1"></div>');
        $('#get-review-result1-1').append('review does not exist');
      }
    });
    $('#get_rid').val('');
  }
};

function getReviewBySID(){
  $('#get-review-result2-1').remove();
  var sid = $('#get_review_sid').val();
  if (sid != '') { // if input field is not empty
    $.ajax({
      url: "/review?storeid=" + sid,
      type: "GET",
      success : function(response){
        var reviews = response.reviews;
        $('#get-review-result2').append('<table id="get-review-result2-1" align="center"></table>');
        $('#get-review-result2-1').append('<tr><th>_id</th><th>userID</th><th>storeID</th><th>rating</th><th>comment</th></tr>');
        for (let i = 0; i < reviews.length; i++){
          var tr = "<tr>";
          var td1 = "<td>" + reviews[i]._id+"</td>";
          var td2 = "<td>" + reviews[i].userID+"</td>";
          var td3 = "<td>" + reviews[i].storeID+"</td>";
          var td4 = "<td>" + reviews[i].rating+"</td>";
          var td5 = "<td>" + reviews[i].comment+"</td>";
        
          $('#get-review-result2-1').append(tr+td1+td2+td3+td4+td5);
        }
      }
    });
    $('#get_review_sid').val('');
  }
};
function getReviewByUID(){
  $('#get-review-result3-1').remove();
  var uid = $('#get_review_uid').val();
  if (uid != '') { // if input field is not empty
    $.ajax({
      url: "/review?userid=" + uid,
      type: "GET",
      success : function(response){
        var reviews = response.reviews;
        $('#get-review-result3').append('<table id="get-review-result3-1" align="center"></table>');
        $('#get-review-result3-1').append('<tr><th>_id</th><th>userID</th><th>storeID</th><th>rating</th><th>comment</th></tr>');
        for (let i = 0; i < reviews.length; i++){
          var tr = "<tr>";
          var td1 = "<td>" + reviews[i]._id+"</td>";
          var td2 = "<td>" + reviews[i].userID+"</td>";
          var td3 = "<td>" + reviews[i].storeID+"</td>";
          var td4 = "<td>" + reviews[i].rating+"</td>";
          var td5 = "<td>" + reviews[i].comment+"</td>";
        
          $('#get-review-result3-1').append(tr+td1+td2+td3+td4+td5);
        }
      }
    });
    $('#get_review_uid').val('');
  }
};

function updateReview(){
  $('#update-review-result-1').remove();
  var rid = $('#review_id_update').val();
  var storeID = $('#storeID_update').val();
  var userID = $('#userID_update').val();
  var rating = $('#rating_update').val();
  var comment = $('#comment_update').val();
  if (rid != '') {
    if (rating != '' || comment != '') {
      /*alert("rating is: "+ parseInt(rating))*/
      $.ajax({
        url: "/review?id=" + rid,
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "storeID": storeID,
          "userID": userID,
          "rating": parseInt(rating),
          "comment": comment
        }),
        error : function(err, response){
          /*alert(err.status);*/
          var result;
          $('#update-review-result').append('<div id="update-review-result-1"></div>');
          if (err.status == 200){
            result = "success";
            $('#review_id_update').val(''); // clear all fields
            $('#storeID_update').val('');
            $('#userID_update').val('');
            $('#rating_update').val('');
            $('#comment_update').val('');
          } else if (err.status == 404){ 
            result = "review does not exist";
            $('#review_id_update').val(''); //only clear reviewID field
          } else { 
            result = "invalid rating";
            $('#rating_update').val('');
          }
          $('#update-review-result-1').append(result);
        }
      });
    }
  }
};

function deleteByRID(){
  $('#del-review-result1-1').remove();
  var rid = $('#del_by_rid').val();
  $.ajax({
    url: "/review?id=" + rid,
    type: "DELETE",
    success : function(err, response){
      $('#del-review-result1').append('<div id="del-review-result1-1"></div>');
      $('#del-review-result1-1').append(response);
    },
    error : function(err, response){
      $('#del-review-result1').append('<div id="del-review-result1-1"></div>');
      $('#del-review-result1-1').append('review not found');
    }
  });
  $('#del_by_rid').val('');
};
function deleteBySID(){
  $('#del-review-result2-1').remove();
  var sid = $('#del_by_sid').val();
  $.ajax({
    url: "/review?storeid=" + sid,
    type: "DELETE",
    success : function(err, response){
      $('#del-review-result2').append('<div id="del-review-result2-1"></div>');
      $('#del-review-result2-1').append(response);
    },
    error : function(err, response){
      $('#del-review-result2').append('<div id="del-review-result2-1"></div>');
      $('#del-review-result2-1').append('store not found');
    }
  });
  $('#del_by_sid').val('');
};
function deleteByUID(){
  $('#del-review-result3-1').remove();
  var uid = $('#del_by_uid').val();
  $.ajax({
    url: "/review?userid=" + uid,
    type: "DELETE",
    success : function(err, response){
      $('#del-review-result3').append('<div id="del-review-result3-1"></div>');
      $('#del-review-result3-1').append(response);
    },
    error : function(err, response){
      $('#del-review-result3').append('<div id="del-review-result3-1"></div>');
      $('#del-review-result3-1').append('user not found');
    }
  });
  $('#del_by_uid').val('');
};