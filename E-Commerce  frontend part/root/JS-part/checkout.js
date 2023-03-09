BASE_URL = "https://relevel-ecomm-be.herokuapp.com/ecomm/api/v1";

const priceDetails = document.getElementById("priceDetails");
const orderSummary = document.getElementById("orderSummary");
const orderConfirmed = document.getElementById("orderConfirmed");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");




// event listeners 

confirmPaymentBtn.addEventListener("click", confirmPayment);

function loadOrderDetails() {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("accessToken");

  let URI = `/carts/${cartId}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  fetch(`${BASE_URL}${URI}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => renderProductDetails(data))
    .catch((err) => console.log(err));
}

function renderProductDetails(data) {
  let orderDetailsHTML =
    '<div class="order-details-title fw-bold"> Order Details ' + "</div>";

  for (i = 0; i < data.productsSelected.length; i++) {
    orderDetailsHTML +=
      '<div class="order-details-product d-flex">' +
      '<div class="order-details-product-img d-flex">' +
      '<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg">' +
      "</div>" +
      '<div class="order-details-product-data d-flex flex-column">' +
      " <div > " +
      data.productsSelected[i].name +
      "</div>" +
      "<div>  Rs. " +
      data.productsSelected[i].cost +
      "</div>" +
      '<div class="order-details-product-remove btn btn-info"> Remove item </div>' +
      "</div>" +
      "</div>";
  }

  let priceDetailsHTML =
    '<div class="price-details-title fw-bold"> Price Details ' +
    "</div>" +
    '<div class="price-details-data">' +
    '<div class="price-details-item d-flex justify-content-between">' +
    "<div > Price</div>" +
    "<div> Rs.  " +
    data.cost +
    "</div>" +
    "</div>" +
    '<div class="price-details-item d-flex justify-content-between">' +
    "<div > Discount</div>" +
    "<div> Rs.  0 </div>" +
    "</div>" +
    '<div class="price-details-item d-flex justify-content-between">' +
    "<div > Delivery charges</div>" +
    "<div> Free </div>" +
    "</div>" +
    '<div class="price-details-item d-flex justify-content-between">' +
    "<div > Total price</div>" +
    "<div> Rs.  " +
    data.cost +
    "</div>" +
    "</div>" +
    "</div>";

  priceDetails.innerHTML = priceDetailsHTML;

  orderSummary.innerHTML = orderDetailsHTML;
}

loadOrderDetails();

  function confirmPayment(){

   orderConfirmed.classList.remove('d-none');
   confirmPaymentBtn.classList.add('d-none')

  }
