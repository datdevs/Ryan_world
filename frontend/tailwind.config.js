module.exports = {
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue'
    ],
    options: {
      safelist: [
        'bg-gray-200', 'bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200',
        'text-gray-800','text-red-800','text-yellow-800','text-green-800','text-blue-800','text-indigo-800','text-purple-800','text-pink-800'
      ]
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1000px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
