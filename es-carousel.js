/**
 * ECMAScript carousel
 * Class that represents a carousel object
 * @author Luiz Henrique Canet Filho <me@luizca.net>
 * @module Carousel
 */
export default class Carousel {
  /**
   * constructor - Create a carousel
   *
   * @param {Element} carousel HTML Element that contains carousel elements
   */
  constructor (carousel) {
    this.carousel = carousel
    this.container = this.carousel.querySelector('.carousel__container')
    this.wrapper = this.carousel.querySelector('.carousel__wrapper')
    this.items = this.carousel.querySelectorAll('.carousel__item')
    this.container.style.overflow = 'hidden'
    this.page = 1
    this.totalPages = this.items.length
    this.pageChange = new CustomEvent('pageChange')

    this.setContainerWidth()

    window.addEventListener('resize', () => {
      this.resize()
    }, false)
  }

  /**
   * setContainerWidth - Get the actual container element width to set the
   * containerWidth attribute
   */
  setContainerWidth () {
    this.containerWidth = window.getComputedStyle(this.container, null).width
    this.containerWidth = Number(this.containerWidth.match(/\d+/)[0])
  }

  /**
   * isFirstPage - Check if the actual page is the first page
   *
   * @return {Boolean}
   */
  isFirstPage () {
    return (this.page === 1)
  }

  /**
   * isLastPage - Check if the actual page is the first page
   *
   * @return {Boolean}
   */
  isLastPage () {
    return (this.page === this.totalPages)
  }

  /**
   * goToNextPage - Show de the next page
   */
  goToNextPage () {
    if (!this.isLastPage()) {
      let length = this.containerWidth * this.page

      this.wrapper.style.transform = 'translateX(-' + length + 'px)'
      this.page = this.page + 1
      this.carousel.dispatchEvent(this.pageChange)
    }
  }

  /**
   * goToPreviousPage - Show de previous page
   */
  goToPreviousPage () {
    if (!this.isFirstPage()) {
      let length = this.containerWidth * (this.page - 2)

      this.page = this.page - 1

      if (!this.isFirstPage()) {
        this.wrapper.style.transform = 'translateX(-' + length + 'px)'
      } else {
        this.wrapper.style.transform = 'translateX(0px)'
      }

      this.carousel.dispatchEvent(this.pageChange)
    }
  }

  /**
   * goToPage - Show an especific page
   *
   * @param {Number} page The page number
   */
  goToPage (page) {
    if (page >= 0 && page <= this.totalPages) {
      let length = this.containerWidth * (page - 1)

      this.page = page

      if (!this.isFirstPage()) {
        this.wrapper.style.transform = 'translateX(-' + length + 'px)'
      } else {
        this.wrapper.style.transform = 'translateX(0px)'
      }

      /**
       * Page Change event.
       *
       * @event Carousel#pageChange
       */
      this.carousel.dispatchEvent(this.pageChange)
    }
  }

  /**
   * enableControls - Binds control elements click events to change page actions
   */
  enableControls () {
    this.previousControl = this.carousel.querySelector('.carousel-controls__previous')
    this.nextControl = this.carousel.querySelector('.carousel-controls__next')

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

  /**
   * resize - Apply resize to the carousel
   */
  resize () {
    this.setContainerWidth()
    this.goToPage(this.page)
  }
}
