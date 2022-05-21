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
                    <button class="btn btn-secondary">borrar</button>
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

loadProducts();