var iUp = (function () {
  var t = 0,
    d = 150,
    clean = function () {
      t = 0
    },
    up = function (e) {
      setTimeout(function () {
        e.classList.add('up')
      }, t)
      t += d
    },
    down = function (e) {
      e.classList.remove('up')
    },
    toggle = function (e) {
      setTimeout(function () {
        e.classList.toggle('up')
      }, t)
      t += d
    }
  return {
    clean: clean,
    up: up,
    down: down,
    toggle: toggle
  }
})()

function getBingImages(imgUrls) {
  /**
   * 鑾峰彇Bing澹佺焊
   * 鍏堜娇鐢  GitHub Action 姣忓ぉ鑾峰彇 Bing 澹佺焊 URL 骞舵洿鏂  images.json 鏂囦欢
   * 鐒跺悗璇诲彇 images.json 鏂囦欢涓殑鏁版嵁
   */
  var indexName = 'bing-image-index'
  var index = sessionStorage.getItem(indexName)
  var $panel = document.getElementById('background')
  if (isNaN(index) || index == 7) index = 0
  else index++
  var imgUrl = imgUrls[index]
  var url = 'https://www.bing.com' + imgUrl
  $panel.style.background = `url("${url}") center center no-repeat #666`
  $panel.style.backgroundSize = 'cover'
  sessionStorage.setItem(indexName, index)
}

function decryptEmail(encoded) {
  var address = atob(encoded)
  window.location.href = 'mailto:' + address
}

function getHitokoto() {
  fetch('https://v1.hitokoto.cn')
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      document.getElementById('description').innerHTML = res.hitokoto + '<br/> -銆 <strong>' + res.from + '</strong>銆 '
    })
}

function resizeFn() {
  if (document.querySelector('#panel').clientHeight < document.querySelector('.panel-main').clientHeight) {
    document.querySelector('#panel').style.overflow = 'auto'
    document.querySelector('#panel').style.alignItems = 'Initial'
  } else {
    document.querySelector('#panel').style.overflow = ''
    document.querySelector('#panel').style.alignItems = ''
  }
}

window.addEventListener('load', event => {
  resizeFn()
  window.addEventListener('resize', resizeFn)
  getHitokoto()

  document.querySelectorAll('.iUp').forEach(function (e) {
    iUp.up(e)
  })

  const $avatar = document.querySelectorAll('.js-avatar')[0]
  $avatar.onload = function () {
    $avatar.classList.add('show')
  }
})