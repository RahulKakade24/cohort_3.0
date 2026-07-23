
        
        document.addEventListener("DOMContentLoaded", () => {
           
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const closeMenuBtn = document.querySelector('.close-menu-btn');
            const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });

            closeMenuBtn.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

           
            const selectors = [
                '.hero-heading', '.hero-buttons', '.marquee-container', 
                '.products-header', '.product-card', '.vibe-tag', 
                '.reviews-badge', '.reviews-heading', '.review-card', 
                '.latte-header', '.latte-card', 
                '.cafe-image-col', '.cafe-text-col', 
                '.journal-header', '.journal-card', 
                '.about-card', '.newsletter-container', '.main-footer'
            ];
            
            const elementsToAnimate = document.querySelectorAll(selectors.join(', '));
            
            
            elementsToAnimate.forEach(el => el.classList.add('animate-on-scroll'));

            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                      
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1, 
                rootMargin: "0px 0px -50px 0px" 
            });

           
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        });
        
const slides = document.querySelectorAll(".carousel-slide");

window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    slides.forEach((slide,index)=>{
        slide.style.transform =
        `translateY(${scrollY * (0.05 + index * 0.03)}px)`;
    });
});

  