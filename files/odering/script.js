let dayProduct = [];
let nightProduct = [];
let comboProduct = [];
let items = {} ;
let listProduct =[];
let cart = document.querySelector(".items-lister");
let total_calc = parseInt(0);
let total_price = document.querySelector(".total-price");
let url = `https://wa.me/+917468804974/?text=`;

//code for get items from webadress
const params = new URLSearchParams(window.location.search);
const total = parseInt(params.get('total')); 
for(i=1; i<=total; i++){
    items[params.get('id'+i)] = parseInt(params.get('quan'+i));
}

//code for make item var object
let productlist = async()=>{
        const daylist = await fetch("../data/morning.json");
        dayProduct = await daylist.json();
        
        const nightlist = await fetch("../data/evening.json");
        nightProduct = await nightlist.json();

        const combolist = await fetch("../data/combo.json");
        comboProduct = await combolist.json();

    let bgColor = `#5a5156`;
    for (let no in items) {
        let id = parseInt(no);
        if (id >= 1 && id <= 100){listProduct = dayProduct;} else if (id >= 101 && id <= 200){listProduct = nightProduct;} else if (id >= 201 && id <= 300){listProduct = comboProduct;}
        let result = listProduct.find(item => item.id === id);
        let quantity = items[no]; // Use original string key
        cart.insertAdjacentHTML("beforeend", ` 
            <div class="items" style="background-color:${bgColor};">
                <div style="background-image: url(../../${result.src});"></div>
                <a>${result.name}</a>
                <a class="quan">${quantity}</a>
                <a>${result.price}</a>
                <a>${result.price * quantity}</a>
            </div>
        `);
        // Toggle background color
        bgColor = (bgColor === "#5a5156") ? "#978d93" : "#5a5156";
        total_calc += result.price * quantity;
        url += result.name+" x"+quantity+"%0a";
        
    }
    total_price.innerText = total_calc;
    url += `%0aTOTAL ${total_calc}`
}
productlist();

let ready = () =>{
 window.location.href = url;
}