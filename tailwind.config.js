module.exports = {
  mode: 'jit',
  theme: {
      backgroundColor: theme => ({
            ...theme('colors'),
            body: '#F1F5FB',
        }),
        backgroundSize: {
          auto: 'auto',
          cover: 'cover',
          contain: 'contain',
      },
    extend: {},
  },
  plugins: [],
  content: ["./src/**/*.tsx"],
  darkMode: 'media', // or 'media' or 'class'
}
