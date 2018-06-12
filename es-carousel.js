export default class Carousel {
  constructor (carousel) {
    this.carousel = carousel
    this.container = this.carousel.querySelector('.carousel__container')
    this.wrapper = this.carousel.querySelector('.carousel__wrapper')
    this.items = this.carousel.querySelectorAll('.carousel__item')
    this.container.style.overflow = 'hidden'
    this.page = 1
    this.totalPages = this.items.length
    this.pageChanged = new CustomEvent('pageChanged')

    this.setContainerWidth()

    window.addEventListener('resize', () => {
      this.resize()
    }, false)
  }

  setContainerWidth () {
    this.containerWidth = window.getComputedStyle(this.container, null).width
    this.containerWidth = Number(this.containerWidth.match(/\d+/)[0])
  }

  isFirstPage () {
    return (this.page === 1)
  }

  isLastPage () {
    return (this.page === this.totalPages)
  }

  goToNextPage () {
    if (!this.isLastPage()) {
      let length = this.containerWidth * this.page

      this.wrapper.style.transform = 'translateX(-' + length + 'px)'
      this.page = this.page + 1
      this.container.dispatchEvent(this.pageChanged)
    }
  }

  goToPreviousPage () {
    if (!this.isFirstPage()) {
      let length = this.containerWidth * (this.page - 2)

      this.page = this.page - 1
      this.container.dispatchEvent(this.pageChanged)

      if (!this.isFirstPage()) {
        this.wrapper.style.transform = 'translateX(-' + length + 'px)'
      } else {
        this.wrapper.style.transform = 'translateX(0px)'
      }
    }
  }

  goToPage (page) {
    if (page >= 0 && page <= this.totalPages) {
      let length = this.containerWidth * (page - 1)

      this.page = page

      if (!this.isFirstPage()) {
        this.wrapper.style.transform = 'translateX(-' + length + 'px)'
      } else {
        this.wrapper.style.transform = 'translateX(0px)'
      }
    }
  }

  enableControls () {
    this.previousControl = this.carousel.querySelector('.carousel-controls__previous')
    this.nextControl = this.carousel.querySelector('.carousel-controls__next')

    this.currentTitle.innerHTML = this.getCurrentTitle()

    this.nextControl.addEventListener('click', () => {
      this.goToNextPage()

      if (!this.isFirstPage()) {
        this.previousControl.classList.remove('carousel-controls__previous--disabled')
      }

      if (this.isLastPage()) {
        this.nextControl.classList.add('carousel-controls__next--disabled')
      }
    })

    this.previousControl.addEventListener('click', () => {
      this.goToPreviousPage()

      if (!this.isLastPage()) {
        this.nextControl.classList.remove('carousel-controls__next--disabled')
      }

      if (this.isFirstPage()) {
        this.previousControl.classList.add('carousel-controls__previous--disabled')
      }
    })
  }

  resize () {
    this.setContainerWidth()
    this.goToPage(this.page)
  }
}
