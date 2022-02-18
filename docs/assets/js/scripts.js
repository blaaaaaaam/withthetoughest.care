let carousels = document.querySelectorAll('.carousel')

carousels.forEach((carousel) => {
  let flkty = new Flickity(carousel, {
    cellAlign: 'center',
    imagesLoaded: true,
    wrapAround: true,
    adaptiveHeight: true,
    pageDots: false,
    // setGallerySize: false
  })
  window.addEventListener('load', (event) => {
    window.dispatchEvent(new Event('resize'))
    flkty.resize()
    flkty.reposition()
  })
})