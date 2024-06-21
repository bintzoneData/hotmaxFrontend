// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['Ubuntu Mono', 'sans-serif'],
      },
      boxShadow: {
        bsh64b: 'rgba(17, 17, 26, 0.1) 0px 1px 0px',
        bsh64t: 'rgba(17, 17, 26, 0.1) 0px -1px 0px',
        bsh64l: 'rgba(17, 17, 26, 0.1) -1px 0px 0px',
        bsh64r: 'rgba(17, 17, 26, 0.1) 1px 0px 0px',
        bsh64tb:
          'rgba(17, 17, 26, 0.1) 0px -1px 0px, rgba(17, 17, 26, 0.1) 0px 1px 0px',
        bsh64lr:
          'rgba(17, 17, 26, 0.1) -1px 0px 0px, rgba(17, 17, 26, 0.1) 1px 0px 0px',
        bsh33:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        bsh08:
          'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        bsh01:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
        bsh19: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
      },
      screens: {
        'max-mq-1000': { max: '1000px' },
        'min-mq-1000': { min: '1000px' },
        'max-mq-450': { max: '450px' },
        'min-mq-450': { min: '450px' },
        'max-mq-800': { min: '800px' },
        'min-mq-800': { max: '800px' },
        'max-mq-600': { max: '600px' },
        'min-mq-600': { min: '600px' },
      },
      colors: {
        mainColor: '#0B2C5E',
        whiteLite: '#f0f1f6',
        blackDark: '#181824',
        navy: '#142c54',
        B_grey: '#2d333b',
        greenBlue: '#6f94a9',
        green: '#33c92d',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
