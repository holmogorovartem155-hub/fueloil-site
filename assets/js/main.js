const burger = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

if (burger) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

const canvas = document.getElementById('noiseCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function noise() {
        if (!ctx) return;
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const val = Math.random() * 80;
            imageData.data[i] = val;
            imageData.data[i+1] = val;
            imageData.data[i+2] = val;
            imageData.data[i+3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(noise);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    noise();
}