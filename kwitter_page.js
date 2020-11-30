// Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDnfLY70ru-WUP2zQE0-Zu4IB9GXR4ktz4",
      authDomain: "kwitter-bf30a.firebaseapp.com",
      databaseURL: "https://kwitter-bf30a.firebaseio.com",
      projectId: "kwitter-bf30a",
      storageBucket: "kwitter-bf30a.appspot.com",
      messagingSenderId: "768106570313",
      appId: "1:768106570313:web:78293f261a0da6a1289598"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

	user_name = localStorage.getItem("user_name");
	room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
	       console.log(message_data);
	       name = message_data['name'];
	       message = message_data['message'];
         like = message_data['like'];
         name_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         message_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_tag ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         like_span = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        output = name_tag + message_tag +like_tag + like_span;       
        document.getElementById("output").innerHTML += output;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_like = Number(likes) + 1;
	console.log(updated_like);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_like  
	 });

}

function Logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}
