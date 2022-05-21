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
                    <button class="btn btn-primary" onclick="editProductClick(${element.id})">Editar</button>
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

function getProductBy(id) {
    axios.get(`${baseUrl}/products/${id}`)
        .then (function (response) {
            const productName = document.getElementById('productName');
            const productImage = document.getElementById('productImage');
            const productPrice = document.getElementById('productPrice');
            const productId = document.getElementById('productId');

            console.log(response.data);
            productName.value = response.data.name;
            productImage.value = response.data.image;
            productId.value = response.data.id;
            productPrice.value = response.data.price;

            show ('product-form');
            hide ('action-buttons');
            hide ('products-container');
        });
}

function saveProduct (product, productId) {
    if (productId === undefined) {
        axios.post(`${baseUrl}/products`, product)
            .then(function (response) {
                loadProducts();

                hide ('product-form');
                show ('action-buttons');
                show ('products-container');
            });
    } else {
        axios.put(`${baseUrl}/products/${productId}`, product)
            .then(function (response) {
                loadProducts();

                hide ('product-form');
                show ('action-buttons');
                show ('products-container');
            });
    }
}

function saveProductClick() {
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const productPrice = document.getElementById('productPrice').value;
    const productId = document.getElementById('productId').value;

    const product = {
        name: productName,
        image: productImage,
        price: productPrice 
    }; 

    if (productId && productId == 0) {
        saveProduct(product);
    } else {
        saveProduct(product, productId);
    }

    console.log('saving product');
    console.debug(product);
}

function newProductClick() {
    show ('product-form');
    hide ('action-buttons');
    hide ('products-container');
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

function editProductClick (productId) {
    getProductBy(productId);
}

loadProducts();