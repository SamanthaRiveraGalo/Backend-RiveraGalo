const socket = io() //levantamos el servidor desde el lado del cliente

const form = document.getElementById('form')
const productUl = document.getElementById('products');

form.addEventListener('submit', (e) => {
    console.log('entro')
    e.preventDefault()

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const thumnail = document.getElementById('imagen').value

    const product = {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        thumnail: thumnail
    };

    socket.emit('add-product', product)

})


socket.on('update-products', (productsList) => {

    console.log(productsList)

    productUl.innerHTML = ''

    productsList.forEach((product) => {
        const item = document.createElement('li')
        item.innerHTML = `<li>
                                <p> Nombre: ${product.title}</p>
                                <p> Codigo: ${product.code} </p>
                                <button onclick="delete-product(${product.id})"> Eliminar </button>
                          </li>`;

        productUl.appendChild(item); // agrego cada producto a la lista

    });
});


function deleteProduct(productId) {
    //este clg no entra
    console.log('escucha el evento')
    socket.emit('delete-product', productId)
}
deleteProduct()
