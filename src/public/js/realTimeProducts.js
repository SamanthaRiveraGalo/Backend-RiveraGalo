const socket = io() //levantamos el servidor desde el lado del cliente

const form = document.getElementById('form')
const productUl = document.getElementById('products');

form.addEventListener('sumit', (e) => {

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

    update()
})

function update() {

    socket.on('update-products', (productsList) => {

        let productItem = ''

        productsList.forEach((product) => {

            productItem = `<li>
                                <p> Nombre: ${product.title}</p>
                                <p> Codigo: ${product.code} </p>
                                <button> Eliminar </button>
                          </li>`;

            productUl.appendChild(productItem); // agrego cada producto a la lista

        });
    });
}

// eliminar un producto

const deleteButton = document.querySelectorAll(".btn-delete")

deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        const id = parseInt(button.id)
        const productId = {
            id: id
        }
        //envio el socket para recibirlo en el servidor
        socket.emit('delete-product', productId)
    })
})

