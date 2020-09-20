const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart

let cart = [];

//getting the products

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();

      const products = products.map((items) => {
        const { title, price } = items.fields;
        const { id } = item.sys;
        const image = items.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//display products
class UI {
  displayProducts(products) {
    let result = "";
    products.foreach((product) => {
      result += `<article class="product">
    <div class="img-container">
      <img
        src=${product.image}
        alt="not available"
        class="product-img"
      />
      <button class="bag-btn" data-id=${product.id}>
        <i class="fas fa-shopping-cart"></i>
      </button>
    </div>
    <h3>${product.name}</h3>
    <h4>$ ${product.price}</h4>
  </article>`;
    });
    productsDOM.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    console.log(buttons);
  }
}
//local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //Get all the products
  products.getProducts().then((data) => {
    ui.displayProducts(data);
    Storage.saveProducts(products);
  });
});
