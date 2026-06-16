/* ===================================
   REVEAL ANIMATION
=================================== */

const reveals =
document.querySelectorAll(".reveal");

const observer =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target
            .classList
            .add("active");

        }

    });

},

{
    threshold:0.15
}

);

reveals.forEach(item=>{
    observer.observe(item);
});


/* ===================================
   IMAGE PARALLAX
=================================== */

const editorials =
document.querySelectorAll(".editorial-card img");

window.addEventListener("scroll",()=>{

    editorials.forEach(img=>{

        const speed = 0.05;

        const y =
        window.pageYOffset * speed;

        img.style.transform =
        `translateY(${y}px) scale(1.05)`;

    });

});