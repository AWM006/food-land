<?php
include('connection.php');

session_start();

if(isset($_SESSION['id']) ){

    if(isset($_POST['submit'])){

        $food_id = $_POST["prod_id"];
        $session_id = $_SESSION['id'];
        echo $food_id."<br>";
        echo $session_id;
        $delete_code = "DELETE FROM cart WHERE session_id = '{$session_id}' AND item = '{$food_id}' LIMIT 1";
        $submit = mysqli_query($connection, $delete_code);
    }
    $query = "SELECT item FROM cart WHERE session_id = '{$_SESSION['id']}'";
    $result = mysqli_query($connection, $query);
    $items = [];
    while($row = mysqli_fetch_assoc($result)){
        $food_id = $row['item'];
        if(isset($items[$food_id])){
            $items[$food_id] += 1;
        } else {
            $items[$food_id] = 1;
        }
    }

    $url = "../../?";
    $total_type = 0;
    $params = [];

    foreach($items as $food_id => $qty){
        $params[] = "id$total_type=$food_id&quan$total_type=$qty";
        $total_type = $total_type + 1;
    }
    $url .=  "totalitem=".$total_type."&";
    $url .= implode("&", $params);

    echo $url;
    header("location: $url"); 
    
}
else{
    
    if(isset($_POST['submit'])){
        $food_id = $_POST["prod_id"];
        $url = $_POST["url"];
        
        //echo $food_id;
        //echo $url;

    parse_str(parse_url($url, PHP_URL_QUERY), $params);

    $totalItems = (int)$params['totalitem'];

    // Convert to array structure
    $cart = [];
    for ($i = 0; $i < $totalItems; $i++) {
        $cart[] = [
            'id'   => $params["id$i"],
            'quan' => $params["quan$i"]
        ];
    }

    
    foreach ($cart as $index => &$item) {
        if ($item['id'] == $food_id) {
            if ($item['quan'] > 1) {
                $item['quan'] -= 1;
            } else {
                unset($cart[$index]);
                $totalItems--;
                $cart = array_values($cart);
            }
            break;
        }
    }

    //making array into new string
    $newParams = ['totalitem' => $totalItems];
    foreach ($cart as $i => $item) {
        $newParams["id$i"]   = $item['id'];
        $newParams["quan$i"] = $item['quan'];
    }

    $newQuery = http_build_query($newParams);
    $newUrl   = strtok($url, '?') . '?' . $newQuery;

    header("location: $newUrl"); 
    }


}


?>