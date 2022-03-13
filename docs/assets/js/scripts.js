let carousels = document.querySelectorAll('.carousel')

carousels.forEach((carousel,index) => {
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
  let counter = document.querySelector(`.counter-${index}`)
  
  function updateCounter() {
    let slide = flkty.selectedIndex + 1
    counter.textContent = `${slide}/${flkty.slides.length}`
  }
  updateCounter
  flkty.on('select', updateCounter)
})