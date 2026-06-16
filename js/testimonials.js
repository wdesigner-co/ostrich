/* ==========================================================
   TESTIMONIALS CAROUSEL
========================================================== */

const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function getLayout() {
    // CORRECCIÓN: 2 visibles en tablet/desktop, 1 en móvil
    const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    const gap = 20; // Debe coincidir con el gap declarado en el CSS
    
    const containerWidth = document.querySelector('.testimonial-container').offsetWidth;
    // Calcula el tamaño real unitario que debe medir cada tarjeta
    const cardWidth = (containerWidth - (gap * (cardsPerView - 1))) / cardsPerView;
    
    return { cardsPerView, cardWidth, gap };
}

function updateSlider() {
    const { cardWidth, gap } = getLayout();
    // Multiplica el índice actual por la suma exacta de la tarjeta + su respectivo espacio intermedio
    const moveDistance = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${moveDistance}px)`;
}

nextBtn.addEventListener('click', () => {
    const { cardsPerView } = getLayout();
    const maxIndex = cards.length - cardsPerView;

    if (currentIndex >= maxIndex) {
        currentIndex = 0; // Efecto bucle: Regresa al inicio si llega al límite
    } else {
        currentIndex++;
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    const { cardsPerView } = getLayout();
    const maxIndex = cards.length - cardsPerView;

    if (currentIndex <= 0) {
        currentIndex = maxIndex; // Salta al final de la lista si está en el primer elemento
    } else {
        currentIndex--;
    }
    updateSlider();
});

// Forzar reajuste milimétrico si el usuario cambia el tamaño o rota la pantalla
window.addEventListener('resize', () => {
    currentIndex = 0; // Resetea a la primera posición para evitar desfases visuales
    updateSlider();
});

// Inicialización automática de medidas al cargar
updateSlider();