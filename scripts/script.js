
let productsContainer = document.getElementById('products-container');
let productsList = [];

const displayProducts = (products) => {
    products.forEach(element => {
        let productElement = document.createElement('div');
        productElement.className = "product";
        productsContainer.appendChild(productElement);

        let img = document.createElement('img');
        img.src = element.imageUrl;
        img.alt = element.alt;
        productElement.appendChild(img);

        let details = document.createElement('div');
        details.className = "details";
        productElement.appendChild(details);
        
        let name = document.createElement('div');
        name.textContent = element.name;
        details.appendChild(name);

        let price = document.createElement('div')
        price.className = 'price'
        price.textContent = `$${element.price}`;
        details.appendChild(price);
    });
}

const getProducts = async () => {
    const response = await fetch("turning-alaska/products.json");
    productsList = await response.json();
    console.log(productsList);
    displayProducts(productsList);
}

const filterProducts = (products) => {
    reset();
    const filter = document.getElementById('search-input').value;
    let filteredProducts = products;
    if (filter != ''){
        filteredProducts = products.filter(element => 
            element.tags &&
            element.tags.some(tag => tag.includes(filter))
            );
    }
    displayProducts(filteredProducts);
}

const reset = () => {
    productsContainer.innerHTML = '';
}

getProducts();

document.getElementById('search-button').addEventListener('click', () => {
    filterProducts(productsList);
});