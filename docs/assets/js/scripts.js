// let elem = document.querySelector('.carousel');
// let flkty = new Flickity( elem, {
//   // options
//   cellAlign: 'center',
//   imagesLoaded: true,
//   wrapAround: true,
//   adaptiveHeight: true,
//   pageDots: false,
// });

window.addEventListener('load', (event) => {
  let loaded = document.createEvent('HTMLEvents')
  loaded.initEvent('resize', true, false)
  document.dispatchEvent(loaded)
  console.log('loaded')
})