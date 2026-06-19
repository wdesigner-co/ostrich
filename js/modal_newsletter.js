const newsletterForm = document.querySelector(".newsletter-form");
const modal = document.getElementById("newsletter-modal");
const closeBtn = document.querySelector(".newsletter-modal-close");
const privacyCheckbox = document.getElementById("newsletterPrivacy");

if(newsletterForm){

  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();

    if(!privacyCheckbox.checked){
      alert("Debes aceptar la Política de Privacidad para suscribirte.");
      return;
    }

    localStorage.setItem("ostrich-newsletter", "subscribed");
    modal.classList.add("show");
    newsletterForm.reset();
  });

}

if(closeBtn){
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

}

if(modal){
  modal.addEventListener("click", e => {
    if(e.target === modal){
      modal.classList.remove("show");
    }

  });

}