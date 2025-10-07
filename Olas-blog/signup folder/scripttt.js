const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-link');

toggleBtn.addEventListener('click' , () => {
    navLinks.classList.toggle('active');
})