var typed= new Typed(".typing", {
    strings: ["Tomato","Capsicum","Potato","Broccoli","Red meat","Ginger","Cauliflower"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
}

