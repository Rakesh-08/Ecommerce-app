BASE_URL = "https://relevel-ecomm-be.herokuapp.com/ecomm/api/v1";
const categoryList = document.getElementById("categoryList");

function loadCategories() {
  

  fetch(`${BASE_URL}/categories`)
    .then((response) => response.json())
    .then((data) => renderCategories(data))
    .catch((err) => console.log(err));
}

loadCategories();

function renderCategories(categories) {
  let categoryListHTML =
    ' <div class="category-items rounded-3 d-flex   justify-content-center align-items-center " >' +
    ' <a class="text-decoration-none text-white" href="productList.html">All Products</a>' +
    "</div>";

  for (i = 0; i < categories.length; i++) {
    categoryListHTML +=
      ' <div class="category-items rounded-3 d-flex justify-content-center align-items-center " >' +
      ' <a class="text-decoration-none text-white" href="productList.html?categoryId=' +
      categories[i].id +
      '">' +
      categories[i].name +
      "</a>" +
      "</div>";
  }

  categoryList.innerHTML = categoryListHTML;
}
