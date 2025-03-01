const slider = {
    slides: document.querySelectorAll('.slide'),
    dotsContainer: document.querySelector('.nav-dots'),
    currentIndex: 0,
    intervalTime: 7000,
    autoSlideId: null
};

const initSlider = () => {
    slider.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.slide = index;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => changeSlide(index));
        slider.dotsContainer.appendChild(dot);
    });

    slider.autoSlideId = setInterval(nextSlide, slider.intervalTime);

    document.querySelectorAll('.arrow, .dot').forEach(element => {
        element.addEventListener('click', () => {
            clearInterval(slider.autoSlideId);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
};

const changeSlide = (newIndex) => {
    const dots = slider.dotsContainer.querySelectorAll('.dot');
    const currentSlide = slider.slides[slider.currentIndex];
    const nextSlide = slider.slides[newIndex];

    currentSlide.classList.remove('active');
    dots[slider.currentIndex].classList.remove('active');
    nextSlide.classList.add('active');
    dots[newIndex].classList.add('active');

    const overlay = nextSlide.querySelector('.overlay');
    overlay.style.animation = 'none';
    requestAnimationFrame(() => {
        overlay.style.animation = 'fadeInUp 0.8s ease-out forwards';
    });

    slider.currentIndex = newIndex;
};

const nextSlide = () => {
    const newIndex = (slider.currentIndex + 1) % slider.slides.length;
    changeSlide(newIndex);
};

const prevSlide = () => {
    const newIndex = (slider.currentIndex - 1 + slider.slides.length) % slider.slides.length;
    changeSlide(newIndex);
};

document.addEventListener('DOMContentLoaded', initSlider);
window.addEventListener('unload', () => clearInterval(slider.autoSlideId));
