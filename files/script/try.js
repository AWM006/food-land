let product = [];

let consoleThis = () =>{
    fetch("files/data/combo.json")
    .then(response => response.json())
    .then(data => {
        product = data;
        product.forEach(p => {
            document.querySelector("body").innerHTML += "<h1>" + Object.keys(product[0].items).length + "</h1>";
        });
    })
    
} 