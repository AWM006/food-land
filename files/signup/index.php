<?php
session_start();
include("../php/connection.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap-5.3.8-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style.css">
    <title>Document</title>
</head>
<body>
    <div id="main">
        <form action="#" method="post">
            <div class="form-row">
              <div class="col">
                 <label for="first">First Name</label>
                <input required type="text" class="form-control" id="first" placeholder="First name" name="fname" style="border: 1px solid black;">
              </div>
              <div class="col">
                 <label for="last">Last Name</label>
                <input required type="text" class="form-control" id="last" placeholder="Last name" name="lname" style="border: 1px solid black;">
              </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Phone</label>
                  <input required type="number" class="form-control" id="inputEmail4" placeholder="Phone" name="phone" style="border: 1px solid black;">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input required type="password" class="form-control" id="inputPassword4" placeholder="Password" name="password" style="border: 1px solid black;">
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">Address</label>
                <input required type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name="address" style="border: 1px solid black;">
            </div>
            <div class="form-row">
                <div class="form-group col-md-2">
                  <label for="inputZip">Pincode</label>
                  <input required type="number" class="form-control" id="inputZip" name="pin" style="border: 1px solid black;">
                </div>
            </div>
            <div class="form-group">
            </div>
            <button type="submit" class="btn btn-primary" id="submit" name="enter">Sign in</button>
            <br>
            <span>Already have account?</span><a href="../login/">click here</a>
        </form>
    </div>

    <script src="../bootstrap-5.3.8-dist/js/bootstrap.min.js"></script>
</body>
</html>

<?php

 if(isset($_POST['enter'])){

  $fname = $_POST["fname"];
  $lname = $_POST["lname"];
  $phone = $_POST["phone"];
  $password = $_POST["password"];
  $address = $_POST["address"];
  $pin = $_POST["pin"];

  // session id generator
  again:
  function generateSessionID($length = 80) {
      return bin2hex(random_bytes($length / 2));
  }
  $session_id = generateSessionID(80);


  $query = "SELECT * FROM people WHERE session_id='$session_id'";
  $result = mysqli_query($connection, $query);

  if(mysqli_num_rows($result) > 0){
    goto again;
  }
  //end session generator

  $insert_code = "INSERT INTO people (FirstName,LastName,phone,password,address,pincode,session_id) VALUES('$fname','$lname','$phone','$password','$address','$pin','$session_id')";

  $submit = mysqli_query($connection, $insert_code);

  if($submit) {
    $_SESSION['id']="$session_id";
    header('location:../php/cart_conn.php');
  }

}
?>