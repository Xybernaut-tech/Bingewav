
        let slideIndex = 0;
        const slides = document.getElementsByClassName("slides");
        const dots = document.getElementsByClassName("dot");
        const slideshowContainer = document.querySelector('.slideshow-container');
        let slideInterval;

        function showSlides() {
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active-slide", "previous-slide");
                dots[i].classList.remove("active");
            }

            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }

            if (slideIndex === 0) {
                slides[slides.length - 1].classList.add("previous-slide");
            } else {
                slides[slideIndex - 1].classList.add("previous-slide");
            }

            slides[slideIndex].classList.add("active-slide");
            dots[slideIndex].classList.add("active");

            adjustContainerHeight();
        }

        function adjustContainerHeight() {
            const activeSlideImage = slides[slideIndex].querySelector('img');
            const slideHeight = activeSlideImage.clientHeight;
            slideshowContainer.style.height = `${slideHeight}px`;
        }

        function startSlideshow() {
            slideInterval = setInterval(showSlides, 5000);
        }

        function pauseSlides() {
            clearInterval(slideInterval);
        }

        function resumeSlides() {
            startSlideshow();
        }

        startSlideshow();
        adjustContainerHeight();
