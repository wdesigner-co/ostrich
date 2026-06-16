const newsletterForm =
  document.querySelector('.newsletter-form');

const modal =
  document.getElementById('newsletter-modal');

const closeBtn =
  document.querySelector('.newsletter-modal-close');

newsletterForm.addEventListener('submit', function(e){

  e.preventDefault();

  modal.classList.add('show');

  this.reset();

});

closeBtn.addEventListener('click', () => {

  modal.classList.remove('show');

});

modal.addEventListener('click', (e) => {

  if(e.target === modal){

    modal.classList.remove('show');

  }

});