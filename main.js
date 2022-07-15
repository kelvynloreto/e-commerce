//! pantalla de carga
window.addEventListener("load", function () {
  const contentLoad = this.document.querySelector(".content_load");

  setTimeout(function () {
    contentLoad.style.display = "none";
  }, 4000);
});

//! color del nav
const containerNav = document.querySelector(".container_nav");
const lettlerRed = document.querySelector(".colorRed");
const letterBlack = document.querySelector(".a_red");

window.onscroll = function () {
  let y = window.scrollY;

  if (y > 1) {
    containerNav.classList.add("auxNav");
  } else {
    containerNav.classList.remove("auxNav");
  }
  if (y > 650) {
    lettlerRed.classList.add("auxPRed");
    letterBlack.classList.add("auxPBlack");
  } else {
    lettlerRed.classList.remove("auxPRed");
    letterBlack.classList.remove("auxPBlack");
  }
};

//! despliegue menu
const iconMenu = document.querySelector("#icon__menu");
const menu = document.querySelector("#menu");
iconMenu.addEventListener("click", function () {
    menu.classList.toggle("show__menu");
});

//! dark mode boton

const dMode= localStorage.getItem("DM") || false
if (JSON.parse(dMode)) {
  document.body.classList.add("darkmode");

   }

const contorno = document.querySelector(".contorno");
contorno.addEventListener("click", () => { 
  
  document.body.classList.toggle("darkmode");
  contorno.classList.toggle("dm_botton");
  JSON.parse(dMode)? localStorage.setItem("DM", JSON.stringify(false)) : localStorage.setItem("DM", JSON.stringify(true));

});

//!pintar cartas en el contenedor

const cards = [
  {
    id: 1,
    img: "./img/featured1.png",
    tipo: "Hoodies",
    element: "hod",
    price: 14.0,
    stock: 5,
  },
  {
    id: 2,
    img: "./img/featured2.png",
    tipo: "Shirts",
    element: "shrt",
    price: 24.0,
    stock: 10,
  },
  {
    id: 3,
    img: "./img/featured3.png",
    tipo: "Sweatshirts",
    element: "swts",
    price: 24.0,
    stock: 15,
  },
];

const products = document.querySelector(".products");
productsMain();

function productsMain() {
  let html = "";
  cards.forEach(({ id, img, tipo, element, price, stock }) => {
    html += `<div class="element ${element} shirts_card " data-iduser="${id}">
    <div>
      <img class="shirts_img" src="${img}" alt="" />
    </div>
    <div class="signo_mas signo_mas${id}" id="signo_mas${id}" onclick="incrementClick${id}()">
      <img src="./img/mas.png" alt="" />
    </div>
    <div class="products_description">
      <div>
        <p>$${price}</p>
        <p>| stock: ${stock}</p>
      </div>
      <p>${tipo}</p>
    </div>
  </div>`;
  });

  products.innerHTML = html;
}

const contenerdorProductosCart = document.querySelector(
  ".contenerdor_productos_cart"
);


function paintCards() {
  let html = "";
  cards.forEach(({ id, img, tipo, price, stock }) => {
    html += `<div class="card card${[id]}">
<div class="product_cart_img">
  <img src=${img} alt="" />
</div>
<div class="product_cart_info">
  <p> ${tipo} </p>
  <p>stock: ${stock} | <span> $${price}</span></p>
  
   <h3 id="sub_total${[id]}"></h3>
  <div class="contener_signos">
    <svg onclick="incrementClick${id}()"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
    >
      <path
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
      ></path>
    </svg>
    <div class="container_price_card">
    <p id="counter-label${[id]}">0</p></div>
    <svg onclick="resetCounter${[id]}()"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
    >
      <path
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z"
      ></path>
    </svg>
    <img
      class="icon_trash${[id]} id="icon_trash"
      src="./img/trash-regular-24.png"
      alt=""
    />
  </div>
</div>
</div>`;
  });
 
  contenerdorProductosCart.innerHTML = html;

}

const iconsTrash = document.getElementById("icon_trash");
const amountTotalItems = document.getElementById("amount_total_items");
const amauntItems = document.querySelector(".amaunt_items");
const totalCost = document.querySelector(".total_cost");

let counterVal1 = 0;
let counterVal2 = 0;
let counterVal3 = 0;
let totalItems = 0;
let allcostAux = 0;

addFooterCart();
paintCards();
//! contenedro del carrito

// abrir y cerrar el contenedor
const xCircle = document.querySelector(".x-circle");
const cart = document.querySelector(".cart");
const containerCart = document.querySelector(".container_main-cart");

cart.addEventListener("click", () => {
  containerCart.classList.add("show_cart");
});
xCircle.addEventListener("click", () => {
  containerCart.classList.remove("show_cart");
});
//!

const removeBg = document.querySelector(".bg_img_cart");
const showCard1 = document.querySelector(".card1");
const card1 = document.getElementById("signo_mas1");
card1.addEventListener("click", () => {
  showCard1.classList.add("jsCard1");
  removeBg.classList.add("remove_cart");
});
let trash1 = 0;
let trash2 = 0;
let trash3 = 0;

const iconTrash1 = document.querySelector(".icon_trash1");
iconTrash1.addEventListener("click", () => {
  counterVal1 = 0;
  if (counterVal1 + counterVal2 + counterVal3 === 0) {
    showCard1.classList.remove("jsCard1");
    removeBg.classList.remove("remove_cart");
    switchbuttonOff();
  }
  totalfooter(
    cards[1].price * counterVal2 + cards[2].price * counterVal3 + "$",
    counterVal2 + counterVal3 + " items",
    (totalItems = counterVal1 + counterVal2 + counterVal3)
  );
  showCard1.classList.remove("jsCard1");
});

const showCard2 = document.querySelector(".card2");
const card2 = document.getElementById("signo_mas2");
card2.addEventListener("click", () => {
  showCard2.classList.add("jsCard2");
  removeBg.classList.add("remove_cart");
});

const iconTrash2 = document.querySelector(".icon_trash2");
iconTrash2.addEventListener("click", () => {
  counterVal2 = 0;
  if (counterVal1 + counterVal2 + counterVal3 === 0) {
    showCard2.classList.remove("jsCard2");
    removeBg.classList.remove("remove_cart");
    switchbuttonOff();
  }
  totalfooter(
    cards[0].price * counterVal1 + cards[2].price * counterVal3 + "$",
    counterVal1 + counterVal3 + " items",
    (totalItems = counterVal1 + counterVal2 + counterVal3)
  );
  showCard2.classList.remove("jsCard2");
});

const showCard3 = document.querySelector(".card3");
const card3 = document.getElementById("signo_mas3");
card3.addEventListener("click", () => {
  showCard3.classList.add("jsCard3");
  removeBg.classList.add("remove_cart");
});

const iconTrash3 = document.querySelector(".icon_trash3");
iconTrash3.addEventListener("click", () => {
  counterVal3 = 0;
  if (counterVal1 + counterVal2 + counterVal3 === 0) {
    showCard3.classList.remove("jsCard3");
    removeBg.classList.remove("remove_cart");
    switchbuttonOff();
  }
  totalfooter(
    cards[0].price * counterVal1 + cards[1].price * counterVal2 + "$",
    counterVal1 + counterVal2 + " items",
    (totalItems = counterVal1 + counterVal2 + counterVal3)
  );
  showCard3.classList.remove("jsCard3");
});

function addFooterCart() {
  let html = `<p id="amount_total_items">0 items</p>`;
  amauntItems.innerHTML = html;
}

Paintimg();

//! sumas y restar carrito
{
  function incrementClick1() {
    if (counterVal1 >= cards[0].stock) {
      alert("We do not have enough in stock");
      return;
    }
    removeBg.classList.add("remove_cart");
    showCard1.classList.add("jsCard1");
    switchbuttonOn();
    trash1++;
    paintAcoumt1(
      ++counterVal1 +
        " Units" +
        " Subtotal: " +
        cards[0].price * counterVal1 +
        "$",
      (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
      (allcostAux =
        cards[0].price * counterVal1 +
        cards[1].price * counterVal2 +
        cards[2].price * counterVal3 +
        "$"),
      (totalItems = counterVal1 + counterVal2 + counterVal3)
    );
  }
  function incrementClick2() {
    if (counterVal2 >= cards[1].stock) {
      alert("We do not have enough in stock");
      return;
    }
    removeBg.classList.add("remove_cart");
    showCard2.classList.add("jsCard2");
    switchbuttonOn();
    trash2++;
    paintAcoumt2(
      ++counterVal2 +
        " Units" +
        " Subtotal: " +
        cards[1].price * counterVal2 +
        "$",
      (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
      (allcostAux =
        cards[0].price * counterVal1 +
        cards[1].price * counterVal2 +
        cards[2].price * counterVal3 +
        "$"),
      (totalItems = counterVal1 + counterVal2 + counterVal3)
    );
  }
  function incrementClick3() {
    if (counterVal3 >= cards[2].stock) {
      alert("We do not have enough in stock");
      return;
    }
    removeBg.classList.add("remove_cart");
    showCard3.classList.add("jsCard3");
    switchbuttonOn();
    trash3++;
    paintAcoumt3(
      ++counterVal3 +
        " Units" +
        " Subtotal: " +
        cards[0].price * counterVal3 +
        "$",
      (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
      (allcostAux =
        cards[0].price * counterVal1 +
        cards[1].price * counterVal2 +
        cards[2].price * counterVal3 +
        "$"),
      (totalItems = counterVal1 + counterVal2 + counterVal3)
    );
  }
  function resetCounter1() {
    if (counterVal1 <= 1) {
      showCard1.classList.remove("jsCard1");
      paintAcoumt1(
        --counterVal1,
        (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
        (allcostAux =
          cards[0].price * counterVal1 +
          cards[1].price * counterVal2 +
          cards[2].price * counterVal3 +
          "$"),
        (totalItems = counterVal1 + counterVal2 + counterVal3)
      );
      return;
    }

    trash1--;
    paintAcoumt1(
      --counterVal1 +
        " Units" +
        " Subtotal: " +
        cards[0].price * counterVal1 +
        "$",
      (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
      (allcostAux =
        cards[0].price * counterVal1 +
        cards[1].price * counterVal2 +
        cards[2].price * counterVal3 +
        "$"),
      (totalItems = counterVal1 + counterVal2 + counterVal3)
    );
  }
  function resetCounter2() {
    if (counterVal2 <= 1) {
      showCard2.classList.remove("jsCard2");
      paintAcoumt2(
        --counterVal2,
        (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
        (allcostAux =
          cards[0].price * counterVal1 +
          cards[1].price * counterVal2 +
          cards[2].price * counterVal3 +
          "$"),
        (totalItems = counterVal1 + counterVal2 + counterVal3)
      );
      return;
    }

    paintAcoumt2(
      --counterVal2 +
        " Units" +
        " Subtotal: " +
        cards[1].price * counterVal2 +
        "$",
      (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
      (allcostAux =
        cards[0].price * counterVal1 +
        cards[1].price * counterVal2 +
        cards[2].price * counterVal3 +
        "$"),
      (totalItems = counterVal1 + counterVal2 + counterVal3)
    );
  }
  function resetCounter3() {
    if (counterVal3 <= 1) {
      showCard3.classList.remove("jsCard3");
      paintAcoumt3(
        --counterVal3,
        (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
        (allcostAux =
          cards[0].price * counterVal1 +
          cards[1].price * counterVal2 +
          cards[2].price * counterVal3 +
          "$"),
        (totalItems = counterVal1 + counterVal2 + counterVal3)
      );
      return;
    }
    paintAcoumt3(
      --counterVal3 +
        " Units" +
        " Subtotal: " +
        cards[2].price * counterVal3 +
        "$",
      (totalItems = counterVal1 + counterVal2 + counterVal3 + " items"),
      (allcostAux =
        cards[0].price * counterVal1 +
        cards[1].price * counterVal2 +
        cards[2].price * counterVal3 +
        "$"),
      (totalItems = counterVal1 + counterVal2 + counterVal3)
    );
  }
}

function paintAcoumt1(counter, item, total, nCart) {
  document.getElementById("counter-label1").innerHTML = counter;
  document.getElementById("amount_total_items").innerHTML = item;
  totalCost.innerHTML = total;
  document.querySelector(".contador_icon_cart").innerHTML = nCart;
}

function paintAcoumt2(counter, item, total, nCart) {
  document.getElementById("counter-label2").innerHTML = counter;
  document.getElementById("amount_total_items").innerHTML = item;
  totalCost.innerHTML = total;
  document.querySelector(".contador_icon_cart").innerHTML = nCart;
}
function paintAcoumt3(counter, item, total, nCart) {
  document.getElementById("counter-label3").innerHTML = counter;
  document.getElementById("amount_total_items").innerHTML = item;
  totalCost.innerHTML = total;
  document.querySelector(".contador_icon_cart").innerHTML = nCart;
}

function totalfooter(costTotal, itemsTotal, nCart) {
  totalCost.innerHTML = costTotal;
  document.getElementById("amount_total_items").innerHTML = itemsTotal;
  document.querySelector(".contador_icon_cart").innerHTML = nCart;
}
function Paintimg() {
  html = `
  <img src="./img/empty-cart.png" alt="" />
  <p>Your cart is empty</p>
  <p>
    You can add items to your cart by clicking on the "+" button on the
    product page.
  </p>
  `;
  removeBg.innerHTML = html;
}

function switchbuttonOn() {
  document.getElementById("edit").disabled = false;
}
function switchbuttonOff() {
  document.getElementById("edit").disabled = true;
}

const btnCheckout = document.querySelector(".Checkout");
function clickcheckot() {
  btnCheckout.addEventListener("click", () => {
    let allval = [counterVal1, counterVal2, counterVal3];

    // let jsCardall= [jsCard1,jsCard2,jsCard3]

    for (let i = 0; i < cards.length; i++) {
      cards[i].stock -= allval[i];
      if (cards[i].stock < 0) {
        cards[i].stock = 0;
      }
    }

    const conf = confirm("do you want to accept the purchase?");
    if (conf) {
      counterVal1 = 0;
      counterVal2 = 0;
      counterVal3 = 0;
      removeBg.classList.remove("remove_cart");
      productsMain();
      switchbuttonOff();
      showCard1.classList.remove("jsCard1");
      showCard2.classList.remove("jsCard2");
      showCard3.classList.remove("jsCard3");
      totalfooter((totalItems = 0 + " $  "), (allcostAux = 0 + " items"), 0);
    }
  });
}

clickcheckot();
