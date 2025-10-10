console.log("cart.js");

const params = new URLSearchParams(window.location.search);
let items = {};
let day_list = [];
let night_List = [];
let combo_list = [];
let list =[];
let cartItem = document.querySelector(".cart-item-listing");
let totalBill = document.querySelector(".total1");
let totalBillno = 0;
let counting = document.querySelector("#count");


const total = params.get('totalitem');
counting.innerText = total;

for(i=0; i<total; i++){
    items[params.get('id'+i)] = parseInt(params.get('quan'+i));
}


let cartProduct = async()=>{
        const day_listing = await fetch("files/data/morning.json");
        day_list = await day_listing.json();
        
        const night_Listing = await fetch("files/data/evening.json");
        night_List = await night_Listing.json();

        const combo_listing = await fetch("files/data/combo.json");
        combo_list = await combo_listing.json();



        for (let no in items) {
            let id = parseInt(no);
            if (id >= 1 && id <= 100){list = day_list;} else if (id >= 101 && id <= 200){list = night_List;} else if (id >= 201 && id <= 300){list = combo_list;}
            let result = list.find(item => item.id === id);
            let quantity = items[no];
            
            //console.log(result);
            //console.log(id+ '=====' +quantity);

            totalBill.innerText = parseInt(totalBill.innerText)+parseInt(result.price) * parseInt(quantity);
            

            cartItem.insertAdjacentHTML('beforeend', `

                <div id="${result.id}" style="margin-bottom:10px">
                    <div class="cart-items">
                        <img src="${result.src}" class="cartimage">
                        <div class="cart-desciption">
                        <p>${result.name}</p>
                    </div>
                </div>
                <div class="inde">
                    <form action="./files/php/cart_dec.php" id="cartForm" method="post">
                        <input type="number" value="${result.id}" name="prod_id" hidden/>
                        <input type="text" value="${window.location.href}" name="url" hidden/>
                        <input type="text" value="open" name="cart" hidden/>
                        <button type="submit" name="submit" class="decrease" onclick="low(${result.id})"><</button>
                    </form>
                    <a class="total-item${result.id}" style="text-decoration:none;">${quantity}</a>
                    <form action="./files/php/cart_conn.php" id="cartForm" method="post">
                        <input type="number" value="${result.id}" name="prod_id" hidden/>
                        <input type="text" value="${window.location.href}" name="url" hidden/>
                        <input type="text" value="open" name="cart" hidden/>
                        <button type="submit" name="submit" class="increase">></button>
                    </form>
                    <a class="total-bill${result.id}" style="text-decoration:none;">${result.price * quantity}</a>
                </div>
            `) 
            
           
        }

        
}
cartProduct();
