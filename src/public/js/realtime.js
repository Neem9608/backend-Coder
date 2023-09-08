// realtime.js
const socket = io()

const productContainer = document.getElementById('products')

socket.on('clientConect', (products)=>{
     
    products.forEach((e) => {
        const addProduct = document.createElement('div');
        addProduct.innerHTML = `<p>Nombre del producto: ${e.title}</p><p>Precio: $${e.price}</p>`
        productContainer.appendChild(addProduct)
  });
    
    
})
