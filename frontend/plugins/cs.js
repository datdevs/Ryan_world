import 'lazysizes'
import 'lazysizes/plugins/bgset/ls.bgset'
import Aos from 'aos'

if (localStorage.rwtheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

Aos.init()
