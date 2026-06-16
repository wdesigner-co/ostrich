document.addEventListener("DOMContentLoaded", () => {
  
  /* =========================================================
     1. FUNCIONALIDAD DE LA GALERÍA (CLICK & SWIPE DETECTION)
  ========================================================= */
  const track = document.getElementById("galleryTrack");
  const thumbs = document.querySelectorAll(".thumb-btn");

  if (track && thumbs.length > 0) {
    // Sincronizar Clic en miniatura con el movimiento del track
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const index = parseInt(thumb.getAttribute("data-index"));
        const offsetWidth = track.offsetWidth;
        
        track.scrollTo({
          left: offsetWidth * index,
          behavior: "smooth"
        });

        actualizarMiniaturaActiva(index);
      });
    });

    // Detectar scroll horizontal (Swipe en móviles) para iluminar la miniatura correcta
    track.addEventListener("scroll", () => {
      const index = Math.round(track.scrollLeft / track.offsetWidth);
      actualizarMiniaturaActiva(index);
    });
  }

  function actualizarMiniaturaActiva(index) {
    thumbs.forEach((t) => t.classList.remove("active"));
    if (thumbs[index]) {
      thumbs[index].classList.add("active");
    }
  }

  /* =========================================================
     2. CONTROLADOR DEL TEXTO DINÁMICO DE COLORES
  ========================================================= */
  const colorSwatches = document.querySelectorAll('.swatch-container input[name="color"]');
  const colorTextLabel = document.getElementById("selected-color-text");

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("change", (e) => {
      if (colorTextLabel) {
        colorTextLabel.textContent = e.target.value;
      }
    });
  });

  /* =========================================================
     3. SELECTOR NUMÉRICO DE CANTIDAD
  ========================================================= */
  const qtyInput = document.getElementById("productQty");
  const btnIncrement = document.getElementById("qtyEncrypt");
  const btnDecrement = document.getElementById("qtyDecrypt");

  if (qtyInput && btnIncrement && btnDecrement) {
    btnIncrement.addEventListener("click", () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    btnDecrement.addEventListener("click", () => {
      const currentVal = parseInt(qtyInput.value);
      if (currentVal > 1) {
        qtyInput.value = currentVal - 1;
      }
    });
  }

  /* =========================================================
     4. ACORDEÓN INTERACTIVO FLUIDO
  ========================================================= */
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";
      const content = header.nextElementSibling;

      // Cerrar otros acordeones abiertos opcionalmente (Efecto exclusivo)
      accordionHeaders.forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.setAttribute("aria-expanded", "false");
          otherHeader.nextElementSibling.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        header.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px"; // Cálculo preciso de altura interna
      } else {
        header.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      }
    });
  });

  /* =========================================================
     5. CAPTURA DEL SUBMIT (CONEXIÓN CON TOAST GLOBAL)
  ========================================================= */
  const purchaseForm = document.getElementById("purchaseForm");
  
  if (purchaseForm) {
    purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const formData = new FormData(purchaseForm);
      const selectedColor = formData.get("color");
      const selectedSize = formData.get("size");
      const selectedQty = formData.get("quantity");

      // Validar si la función global de alertas tipo toast existe en app2.js
      if (typeof showToast === "function") {
        showToast(`¡Añadido! ${selectedQty}x Signature Tote (${selectedColor} / Talla ${selectedSize})`, "success");
      } else {
        alert(`Producto añadido a la bolsa:\n${selectedQty}x The Signature Tote\nColor: ${selectedColor}\nTalla: ${selectedSize}`);
      }
    });
  }
});