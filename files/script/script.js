let cartImage = document.querySelector(".cart-img");
let cartAdd = document.querySelector(".carting");
let mainCart = document.querySelector(".cart-div");
let open = false;
let close = document.querySelector(".close");
let cartItem = document.querySelector(".cart-item-listing");
let count = document.querySelector(".count"); 
let countNo = parseInt(count.innerText);
let existORnot = {};
let i;
let decrease = document.querySelector(".decrease");
let increase = document.querySelector(".increase");
let totalBill = document.querySelector(".total1");
let totalBillno = parseInt(totalBill.innerText);
let listProductHTML = document.querySelector('#addItem');
let mainItemAdder = document.querySelector('#main-container');
let dayProduct = [];
let nightProduct = [];
let comboProduct = [];
let listProduct;
let morningSection = document.querySelector(".morning");
let eveningSection = document.querySelector(".evening");
let comboSection = document.querySelector(".combo");
let totalFood;
let d = new Date();




//add my food function

addMYfood = (timing) => {
  listProductHTML.innerHTML = ''; // clear product list first
 
  if (timing.length > 0) {

    timing.forEach(product => {
      listProductHTML.insertAdjacentHTML('beforeend', `
        <div class="col-sm-6 col-md-4">
          <div class="card h-100">
            <div class="card-img-top" 
                 style="background-image:url('${product.src}'); 
                        background-size: cover; 
                        background-position: center; 
                        height: 200px;">
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">₹${product.price}</p>
              <button class="btn w-100" 
                      style="background-color: brown; color: white;" 
                      onclick="addtoCart(${product.id}); popup();">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `);
    });
  }
}

addMyCombo = () =>{
    listProductHTML.innerHTML = '';
    if(comboProduct.length > 0){
        listProductHTML.innerHTML = "";
        comboProduct.forEach(product =>{

            let itemsHTML = '';    
            Object.values(product.items).forEach(item => {
                itemsHTML += `<p>*${item}</p>`;
            })                      

            let photoHTML = '';    
            Object.values(product.item_src).forEach(photo => {
                photoHTML += `<img src="${photo}">`;
            })                
            
            listProductHTML.insertAdjacentHTML('beforeend', `
                        <div style="margin-bottom: 0.5rem;">
                            <div class="combo-div">             
                                    <div class="combo_image">
                                        ${photoHTML}
                                    </div>
                                    <div class="combo-caring">
                                        <button class="addCart" onclick="addtoCart(${product.id}); popup();">CART</button>
                                    </div>
                            </div>
                            <div class="combo-set">
                                <div style="width: 70%;">
                                    ${itemsHTML}
                                </div>
                                <div>
                                    <p>price</p>
                                    <p><b>${product.price}</b></p>
                                </div>
                            </div>
                        </div>

            `)
        })
    }
}
//code for add itemsmenu
const daylist = () =>{
    fetch("files/data/morning.json")
    .then(response => response.json())
    .then(data => {
        dayProduct = data;
        eveningSection.style.backgroundColor = "brown";
        eveningSection.style.color = "white";
        comboSection.style.backgroundColor = "brown";
        comboSection.style.color = "white";
        morningSection.style.backgroundColor = "white";
        morningSection.style.color = "brown"
        addMYfood(dayProduct);
    })
}

const nightlist = () =>{
    fetch("files/data/evening.json")
    .then(response => response.json())
    .then(data => {
        nightProduct = data ;
        eveningSection.style.backgroundColor = "white";
        eveningSection.style.color = "brown";
        morningSection.style.backgroundColor = "brown";
        morningSection.style.color = "white";
        comboSection.style.backgroundColor = "brown";
        comboSection.style.color = "white";
        addMYfood(nightProduct);
    })
}
const combolist = ()=>{
    fetch("files/data/combo.json")
    .then(response => response.json())
    .then(data => {
        comboProduct = data;
        eveningSection.style.backgroundColor = "brown";
        eveningSection.style.color = "white";
        morningSection.style.backgroundColor = "brown";
        morningSection.style.color = "white";
        comboSection.style.backgroundColor = "white";
        comboSection.style.color = "brown";
        addMyCombo();
    })
}
//set timig for foods
(d.getHours()>5 && d.getHours()<15)?(daylist()):( nightlist());

//code for cart open
cartImage.addEventListener('click',()=>{
    if(open == false){
        mainCart.style.left = "20%" ;
        open = true ;
        document.querySelector(".go-to-cart-popup").style.display = "none";
    }
    else{
        mainCart.style.left = "100%" ;
        open = false ;
    }
})
cartAdd.addEventListener('click',()=>{
    if(open == false){
        mainCart.style.left = "20%" ;
        open = true ;
        document.querySelector(".go-to-cart-popup").style.display = "none"
    }
})
close.addEventListener('click',()=>{
    mainCart.style.left = "100%";
    open = false;
})

window.addtoCart = (a)=>{
    if(a>=1 && a<=100) {listProduct = dayProduct} else if(a>=101 && a<=200){listProduct = nightProduct} else if(a>=201 && a<=300){ listProduct = comboProduct}
    result =  listProduct.find(item => item.id === a);
    countNo = countNo + 1;
    count.innerText = countNo;
    if(existORnot[a]){
        document.querySelector(".total-item"+a).innerText = parseInt(document.querySelector(".total-item"+a).innerText) + 1;
        document.querySelector(".total-bill"+a).innerText = parseInt( document.querySelector(".total-bill"+a).innerText) + parseInt(result.price);
        totalBill.innerText = parseInt(totalBill.innerText) + parseInt(result.price);
        existORnot[a] += 1 ;
        
        return;
    }
     existORnot[a] = 1;
    cartItem.insertAdjacentHTML('beforeend', `
        <div id="${a}" style="margin-bottom:10px">
            <div class="cart-items">
                <img src="${result.src}" class="cartimage">
                <div class="cart-desciption">
                <p>${result.name}</p>
            </div>
        </div>
        <div class="inde">
            <button class="decrease" onclick="low(${a})"><</button>
            <a class="total-item${a}">1</a>
            <button class="increase" onclick="addtoCart(${a})">></button>
            <a class="total-bill${a} style="text-decoration= none;">${result.price}</a>
        </div>
    `) 
    totalBill.innerText = parseInt(totalBill.innerText) + parseInt(result.price);
}
let popup = () =>
{   if(open == false){
        //for pop up window
        document.querySelector(".go-to-cart-popup").style.display = "block"
        setTimeout(() => {
        document.querySelector(".go-to-cart-popup").style.display = "none";
        }, 5000);
    }
}


window.low = (a) =>{
    if(a>=1 && a<=100) {listProduct = dayProduct} else if(a>=101 && a<=200){listProduct = nightProduct}
    result =  listProduct.find(item => item.id === a);
    if(existORnot[a]){
        if(document.querySelector(".total-item"+a).innerText > 1){
            document.querySelector(".total-item"+a).innerText = parseInt(document.querySelector(".total-item"+a).innerText) - 1;
            countNo = countNo - 1;
            count.innerText = countNo;
            document.querySelector(".total-bill"+a).innerText = parseInt( document.querySelector(".total-bill"+a).innerText) - parseInt(result.price);
            document.querySelector(".total1").innerText = parseInt(document.querySelector(".total1").innerText) - parseInt(result.price) ;
             existORnot[a] -= 1;
        }
        else{
            delete existORnot[a]; 
            document.querySelector(".total1").innerText = parseInt(document.querySelector(".total1").innerText) - parseInt(result.price) ;
            let parentWithId = document.querySelector(".total-item"+a).closest('div[id]');
            if (parentWithId) {
                parentWithId.remove();
            }
            countNo = countNo - 1;
            count.innerText = countNo;
            let index = existORnot.indexOf(a); // find the index
           if (index > -1) {
           existORnot.splice(index, 1);
            }
            return;
        }
    }
}  
window.confirmOrder = () => {
    if(Object.keys(existORnot).length>0){
        let summary = `./files/odering/index.html?total=${Object.keys(existORnot).length}`;
        let i = parseInt(1);
        i =1;
        for (let id in existORnot) {
            summary += `&id${i}=${id}&quan${i}=${existORnot[id]}`;
            i += 1;
        }
        window.location.href = summary;
}
}                