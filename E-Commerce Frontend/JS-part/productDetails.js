BASE_URL = "https://relevel-ecomm-be.herokuapp.com/ecomm/api/v1";

const addToCartBtn = document.getElementById("addToCartBtn");
const goToCartBtn = document.getElementById("goToCartBtn");
const productDetails = document.getElementById("productDetails");

// event listeners

addToCartBtn.addEventListener("click", addToCartFn);

function loadProduct() {
  const productID = window.location.search.split("=")[1];

  fetch(`${BASE_URL}/products/${productID}`)
    .then((response) => response.json())
    .then((data) => renderProductDetails(data))
    .catch((err) => console.log(err));
}

function renderProductDetails(data) {
  productDetailsHTML =
    '<div class="product-name">' +
    data.name +
    "</div>" +
    '<div class="product-price fw-bold">Rs. ' +
    data.cost +
    "</div>" +
    '<div class="product-description">' +
    '<div class="product-description-title fw-bold"> Description </div>' +
    '<div class="product-description-data ">' +
    data.description +
    "</div>" +
    "</div>";

  productDetails.innerHTML = productDetailsHTML;
}

loadProduct();

function addToCartFn() {
  const productID = window.location.search.split("=")[1];

  const token = localStorage.getItem("accessToken");
  const cartId = localStorage.getItem("cartId");

  const data = {
    productIds: [productID],
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  fetch(`${BASE_URL}/carts/${cartId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        goToCartBtn.classList.remove("d-none");
        addToCartBtn.classList.add("d-none");
      }
    })
    .catch((err) => console.log(err));
}
