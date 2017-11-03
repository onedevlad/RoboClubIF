window.onload = function () {
  var $body = $('body')[0]
  var $loader = $('.preloader')

  if ($loader.size() > 0) {
    setTimeout(function() {
      $loader[0].style.opacity = 0
      $loader[0].style.visibility = 'hidden'
      $body.style.overflow = 'visible'
    }, 1000)
  }
}

$.fn.filterData = function(key, value) {
  return this.filter(function() {
    return $(this).data(key) == value
  })
}

$(function() {
  $('.quotes-slider__photo').hide()
  $('.quotes-slider').slick({
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    pauseOnDotsHover: true,
    dots: true,
    dotsClass: 'quotes-slider__nav',
    customPaging: function(slider, i) {
      var $pic = slider.$slides.eq(i).find('.quotes-slider__photo')

      return $pic.clone().show()
    }
  })

  /*---------------------------------------------------*/

  $('body').on('change', '.courses-filter select', function() {
    var filterType = $(this).data('filter'),
      filterVal = $(this).val(),
      $filteredItems = $('.courses .preview')

    if (!filterType) return 0
    if(filterVal === 'all') return $filteredItems.show()

    $filteredItems.hide().filterData(filterType, filterVal).show()
  })

  /*---------------------------------------------------*/

  $('input[placeholder], textarea[placeholder]').placeholder()


})

$(document).ready(function() { // FAQ Sliding
  var sliderSpeed = 300

  $('.faq-wrapper .item-wrapper').click(function() {
    var $this = $(this)
    var currItem = $this.attr('id').slice(-1)
    if($this.hasClass('open')) {
      $this.removeClass('open')
      $('[id^=item-subtitle-'+currItem+']').slideUp(sliderSpeed).removeClass('open')
      $('[id^=item-text-'+currItem+']').slideUp(sliderSpeed)
    }
    else {
      $this.addClass('open')
      $('[id^=item-subtitle-'+currItem+']').slideDown(sliderSpeed)
    }
  })

  $('.faq-wrapper .subtitle-wrapper').click(function(event) {
    event.stopPropagation()
    var $this = $(this)
    var currItem = $this.attr('id').slice(-3)
    if($this.hasClass('open')) {
      $this.removeClass('open')
      $('#item-text-'+currItem).slideUp(sliderSpeed)
    }
    else {
      $this.addClass('open')
      $('#item-text-'+currItem).slideDown(sliderSpeed)
    }
  })

  $('.faq-wrapper .text-wrapper').click(function(event) {
    event.stopPropagation()
    var $this = $(this)
    var currItem = $this.attr('id').slice(-3)
    if($this.parent().find('.subtitle-wrapper').hasClass('open')) {
      $this.parent().find('.subtitle-wrapper').removeClass('open')
      $('#item-text-'+currItem).slideUp(sliderSpeed)
    }
    else {
      $this.parent().find('.subtitle-wrapper').addClass('open')
      $('#item-text-'+currItem).slideDown(sliderSpeed)
    }
  })
})

$(document).ready(function() {
  $('.gallery-preview-slider').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    slidesToShow: 6,
    swipeToSlide: true,
  })
  $('.swipebox').swipebox({ loopAtEnd: true })
  $('.slick-news-slider').slick({
    lazyLoad: 'progressive',
    draggable: false,
    prevArrow: '.slick-news-slider-prev',
    nextArrow: '.slick-news-slider-next',
  })
})

$(document).ready(function() { // Gallery filter
  $('.filter-button').on('click', function() {
    $('.filter-button.active').removeClass('active')
    $(this).addClass('active')

    var filterType = 'type',
      filterVal = $(this).data('filter'),
      $filteredItems = $('.preview')

    if (!filterType) return 0
    if(filterVal === 'all') return $filteredItems.show()

    $filteredItems.hide().removeClass('swipebox').filterData(filterType, filterVal).show().addClass('swipebox')
  })
})

$(document).ready(function (){
  $.fatNav()
  $('.goto-contacts').click(function() {
    $("html, body").animate({ scrollTop: $('.contacts-section').offset().top }, 1000);
  })
})