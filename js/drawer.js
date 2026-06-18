/* =========================================================
   OSTRICH CART
========================================================= */

class OstrichCart {
  constructor() {
    this.storageKey = "ostrich-cart";

    this.cart = JSON.parse(
      localStorage.getItem(this.storageKey)
    ) || [];

    this.drawer =
      document.getElementById(
        "cartDrawer"
      );

    this.overlay =
      document.getElementById(
        "cartOverlay"
      );

    this.itemsContainer =
      document.getElementById(
        "cartItems"
      );

    this.subtotalElement =
      document.getElementById(
        "cartSubtotal"
      );

    this.countElement =
      document.getElementById(
        "cartCount"
      );

    this.init();
  }

  /* ==========================================
     INICIALIZACIÓN
  ========================================== */

  init() {

    const cartButton =
      document.getElementById(
        "cartButton"
      );

    const cartClose =
      document.querySelector(
        ".cart-close"
      );

    if (cartButton) {

      cartButton.addEventListener(
        "click",
        () => this.open()
      );
    }

    if (cartClose) {

      cartClose.addEventListener(
        "click",
        () => this.close()
      );
    }

    if (this.overlay) {

      this.overlay.addEventListener(
        "click",
        () => this.close()
      );
    }

    this.render();
  }

  /* ==========================================
     ABRIR CARRITO
  ========================================== */

  open() {

    this.drawer?.classList.add(
      "active"
    );

    this.overlay?.classList.add(
      "active"
    );
  }

  /* ==========================================
     CERRAR CARRITO
  ========================================== */

  close() {

    this.drawer?.classList.remove(
      "active"
    );

    this.overlay?.classList.remove(
      "active"
    );
  }

  /* ==========================================
     GUARDAR EN LOCALSTORAGE
  ========================================== */

  save() {

    localStorage.setItem(

      this.storageKey,

      JSON.stringify(
        this.cart
      )

    );
  }

  /* ==========================================
     AGREGAR PRODUCTO
  ========================================== */

  add(product) {

    const quantity =
      product.quantity || 1;

    const existing =
      this.cart.find(

        item =>
          item.id === product.id

      );

    if (existing) {

      existing.quantity += quantity;

    } else {

      this.cart.push({

        ...product,

        quantity

      });
    }

    this.save();

    this.render();

    this.open();
  }

  /* ==========================================
     ELIMINAR PRODUCTO
  ========================================== */

  remove(id) {

    this.cart =
      this.cart.filter(

        item =>
          item.id !== id

      );

    this.save();

    this.render();
  }

  /* ==========================================
     AUMENTAR CANTIDAD
  ========================================== */

  increase(id) {

    const item =
      this.cart.find(

        product =>
          product.id === id

      );

    if (!item) return;

    item.quantity++;

    this.save();

    this.render();
  }

  /* ==========================================
     DISMINUIR CANTIDAD
  ========================================== */

  decrease(id) {

    const item =
      this.cart.find(

        product =>
          product.id === id

      );

    if (!item) return;

    item.quantity--;

    if (
      item.quantity <= 0
    ) {

      this.remove(id);

      return;
    }

    this.save();

    this.render();
  }

  /* ==========================================
     SUBTOTAL
  ========================================== */

  getSubtotal() {

    return this.cart.reduce(

      (total, item) =>

        total +
        item.price *
        item.quantity,

      0
    );
  }

  /* ==========================================
     TOTAL DE ARTÍCULOS
  ========================================== */

  getTotalItems() {

    return this.cart.reduce(

      (total, item) =>

        total +
        item.quantity,

      0
    );
  }

  /* ==========================================
     FORMATO MONEDA COP
  ========================================== */

  formatPrice(price) {

    return new Intl.NumberFormat(

      "es-CO",

      {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
      }

    ).format(price);
  }

  /* ==========================================
     RENDER
  ========================================== */

  render() {

    if (!this.itemsContainer)
      return;

    /* ------------------------------
       CARRITO VACÍO
    ------------------------------ */

    if (!this.cart.length) {

      this.itemsContainer.innerHTML = `

        <p class="cart-empty">
          Tu bolsa está vacía.
        </p>

      `;
    }

    /* ------------------------------
       PRODUCTOS
    ------------------------------ */

    else {

      this.itemsContainer.innerHTML =

        this.cart.map(item => `

          <article class="cart-item">

            <img
              src="${item.image}"
              alt="${item.name}">

            <div class="cart-item-info">

              <h3>
                ${item.name}
              </h3>

              <p class="cart-price">
                ${this.formatPrice(item.price)}
              </p>

              <div class="cart-controls">

                <div class="cart-quantity">

                  <button
                    type="button"
                    class="cart-qty-btn"
                    onclick="cart.decrease('${item.id}')">

                    −

                  </button>

                  <span class="cart-qty-value">

                    ${item.quantity}

                  </span>

                  <button
                    type="button"
                    class="cart-qty-btn"
                    onclick="cart.increase('${item.id}')">

                    +

                  </button>

                </div>

                <button
                  type="button"
                  class="cart-remove"
                  aria-label="Eliminar producto"
                  onclick="cart.remove('${item.id}')">

                  <i class="fa-solid fa-trash"></i>

                </button>

              </div>

            </div>

          </article>

        `).join("");
    }

    /* ------------------------------
       SUBTOTAL
    ------------------------------ */

    if (
      this.subtotalElement
    ) {

      this.subtotalElement.textContent =

        this.formatPrice(
          this.getSubtotal()
        );
    }

    /* ------------------------------
       CONTADOR HEADER
    ------------------------------ */

    if (
      this.countElement
    ) {

      this.countElement.textContent =

        `(${this.getTotalItems()})`;
    }
  }
}

/* =========================================================
   INSTANCIA GLOBAL
========================================================= */

const cart =
  new OstrichCart();

/* =========================================================
   PRODUCT DETAIL
========================================================= */

const addToCartBtn =
  document.getElementById(
    "addToCartBtn"
  );

if (addToCartBtn) {

  addToCartBtn.addEventListener(

    "click",

    () => {

      const quantity =
        Number(

          document.getElementById(
            "productQty"
          ).value

        );

      cart.add({

        id: "manglar",

        name: "Manglar",

        price: 756000,

        image:
          "img/collections/hero_manglar.png",

        quantity

      });

    }
  );
}