const baseUrl = "https://e-commerce-api-academlo.herokuapp.com/api";

function displayProducts (products) {
    const productsContainer = document.getElementById("products-container");

    let html = '';
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        html += `
        <div class="col-3">
            <div class="card">
                <img src="${element.image}" class="card-img-top">
                <div class="card-body">
                    <h3>${element.name}</h3>
                    <p>$${element.price}</p>
                    <button class="btn btn-primary">Editar</button>
                    <button class="btn btn-secondary" onclick="deleteProductClick(${element.id})">Borrar</button>
                </div>
            </div>
        </div>`;
    }

    productsContainer.innerHTML = html;
}

function loadProducts () {
    axios.get(`${baseUrl}/products`)
        .then(function (response) {
            console.log(response.data);
            displayProducts(response.data);
        });
}

function saveProduct (product) {
    axios.post(`${baseUrl}/products`, product)
        .then(function (response) {
            loadProducts();

            hide ('product-form');
            show ('action-buttons');
            show ('products-container');
        });
}

function saveProductClick() {
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const productPrice = document.getElementById('productPrice').value;

    const product = {
        name: productName,
        image: productImage,
        price: productPrice 
    }; 

    saveProduct(product);

    console.log('saving product');
    console.debug(product);
}

function newProductClick() {
    show ('product-form');
    hide ('action-buttons');
    hide ('products-container');

    console.log("new product...");
}

function cancelProductClick() {
    hide ('product-form');
    show ('action-buttons');
    show ('products-container');
}

function deleteProductClick (productId) {
    axios.delete(`${baseUrl}/products/${productId}`)
        .then(function (response) {
            loadProducts();
        });
}

loadProducts();