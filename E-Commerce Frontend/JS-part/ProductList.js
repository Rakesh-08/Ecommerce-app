BASE_URL = "https://relevel-ecomm-be.herokuapp.com/ecomm/api/v1";

const categoryList = document.getElementById("categoryList");
const productList = document.getElementById("productList");
const clear = document.getElementById("clear");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const searchInput = document.getElementById("searchInput");

// event listeners

searchInput.addEventListener("keyup", searchProduct);
minPrice.addEventListener("change", searchProduct);
maxPrice.addEventListener("change", searchProduct);
clear.addEventListener("click", clearAllFilters);

function searchProduct() {
  let data = {
    name: searchInput.value,
    minCost: minPrice.value,
    maxCost: maxPrice.value,
  };

  let URI = "/products?";

  let searchAPI = new URLSearchParams(data);

  console.log(BASE_URL + URI + searchAPI);

  fetch(BASE_URL + URI + searchAPI)
    .then((response) => response.json())
    .then((data) => renderProducts(data));
}

function clearAllFilters() {
  window.location.reload();
}

function loadCategories() {
  fetch(`${BASE_URL}/categories`)
    .then((response) => response.json())
    .then((data) => renderCategories(data))
    .catch((err) => console.log(err));
}

function loadProducts() {
  const data = {};

  if (window.location.search) {
    data.id = window.location.search.split("=")[1];
  }

  let URI = "/products";

  if (data.id) {
    URI = `/categories/${data.id}/products`;
  }

  fetch(`${BASE_URL}${URI}`)
    .then((response) => response.json())
    .then((data) => renderProducts(data))
    .catch((err) => console.log(err));
}

function renderCategories(categories) {
  let categoryListHTML = "";

  for (i = 0; i < categories.length; i++) {
    categoryListHTML +=
      ' <a class=" mx-2 text-decoration-none " href="productList.html?categoryId=' +
      categories[i].id +
      '">' +
      categories[i].name +
      "</a>";
  }

  categoryList.innerHTML = categoryListHTML;
}

function renderProducts(products) {
  let productListHTML = "";

  for (i = 0; i < products.length; i++) {
    productListHTML +=
      '<a class="product-item text-decoration-none d-inline-block" href="productDetails.html?productId=' +
      products[i].id +
      '"> ' +
      '<div class="product-img">' +
      '<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" >' +
      "</div>" +
      '<div class="product-name text-center">' +
      products[i].name +
      "</div>" +
      '<div class="product-price text-center"> Rs. ' +
      products[i].cost +
      "</div>" +
      "</a>";
  }

  productList.innerHTML = productListHTML;
}

loadCategories();
loadProducts();
