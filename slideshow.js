document.addEventListener('DOMContentLoaded', function() {
        let carouselIndex = 0;
        const carouselSlides = document.getElementsByClassName("carousel-slide");
        const carouselDots = document.getElementsByClassName("carousel-dot");
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        let carouselInterval;

        function showCarouselSlides() {
            for (let i = 0; i < carouselSlides.length; i++) {
                carouselSlides[i].classList.remove("current-slide", "prev-slide");
                carouselDots[i].classList.remove("active-dot");
            }

            carouselIndex++;
            if (carouselIndex >= carouselSlides.length) {
                carouselIndex = 0;
            }

            if (carouselIndex === 0) {
                carouselSlides[carouselSlides.length - 1].classList.add("prev-slide");
            } else {
                carouselSlides[carouselIndex - 1].classList.add("prev-slide");
            }

            carouselSlides[carouselIndex].classList.add("current-slide");
            carouselDots[carouselIndex].classList.add("active-dot");

            adjustCarouselHeight();
        }

        function adjustCarouselHeight() {
            const activeCarouselImage = carouselSlides[carouselIndex].querySelector('img');
            const slideHeight = activeCarouselImage.clientHeight;
            carouselWrapper.style.height = `${slideHeight}px`;
        }

        function startCarousel() {
            carouselInterval = setInterval(showCarouselSlides, 5000);
        }

        function pauseCarousel() {
            clearInterval(carouselInterval);
        }

        function resumeCarousel() {
            startCarousel();
        }

        startCarousel();
        adjustCarouselHeight();
  });
