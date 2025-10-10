console.log("oprn.js");
const parameter = new URLSearchParams(window.location.search);

let  isCartopen = parameter.get('cart');
if(isCartopen === "open"){
    document.querySelector(".cart-div").style.left = "20%" ;
}