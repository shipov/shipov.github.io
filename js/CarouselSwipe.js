class CarouselSwipe {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.startX = 0;
    this.scrollLeft = 0;
    this.isDown = false;

    this.init();
  }

  init() {
    // Обработчики событий
    this.carousel.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.carousel.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.carousel.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.carousel.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.carousel.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.carousel.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.carousel.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  onMouseDown(e) {
    this.isDown = true;
    this.carousel.classList.add('active');
    this.startX = e.pageX - this.carousel.offsetLeft;
    this.scrollLeft = this.carousel.scrollLeft;
  }

  onTouchStart(e) {
    this.isDown = true;
    this.startX = e.touches[0].pageX - this.carousel.offsetLeft;
    this.scrollLeft = this.carousel.scrollLeft;
  }

  onMouseMove(e) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.carousel.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.carousel.scrollLeft = this.scrollLeft - walk;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches[0].pageX - this.carousel.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.carousel.scrollLeft = this.scrollLeft - walk;
  }

  onMouseUp() {
    this.isDown = false;
    this.carousel.classList.remove('active');
  }

  onTouchEnd() {
    this.isDown = false;
  }

  onMouseLeave() {
    this.isDown = false;
  }
}

// Инициализация карусели
new CarouselSwipe(document.getElementById('carousel'));
