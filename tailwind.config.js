const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['Objektiv-mk2', 'sans-serif']
    },
    
    extend: {
      backgroundColor: theme => ({
        'darkgray': '#24242B',
        'appbar': '#18181D'
      }),
      textColor: theme => ({
        'subwhite': '#8899A6',
        'logo': '#F1F1F3',
        'basegray': '#C5C5C5'
      }),
      colors: {
        // Unique Colors
        'primary': '#8E477F',
        'primary-light': '#3d6be2',
        'secondary': '#EFA9E0',
        'secondary-light': '#ED74E1',
        
        // Neutral Colors
        'ground': '#24242B',
        'glass': '#303034',
        'glass-stroke': '#505050',
        'onglass': '#C5C5C5',
        'onglass-weak': '#A0A0A0',
        'acrylic': '#2A2A2D',
        'acrylic-light': '#3A3A40',
        'onacrylic': '#C5C5C5',
        'card': '#44444E',
        'oncard':'#FFFFFF',

        // Gradient factors
        'border_l': '#D88080',
        'border_r': '#DB85C8',

        // Specific Colors
        'done': '#33C102',
        'progress': '#D4BD1B',
        'suspended': '#AF1E1E',

      },
      dropShadow: {
        'base': '4px 4px 2px rgba(0, 0, 0, 0.25)',
        'high': '10px 10px 10px rgba(0, 0, 0, 0.5)',
        'higher': '20px 20px 20px rgba(0, 0, 0, 0.5)'
      },
      maxHeight: {
        '4/5': '80%',
      },
      minHeight: {
        "44": "11rem",
        "24": "6rem"
      },
      maxWidth: {
        "modal": "708px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [plugin(function ({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        /* IE and Edge */
        '-ms-overflow-style': 'none',
  
        /* Firefox */
        'scrollbar-width': 'none',
  
        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
      
      '.scrollbar-default': {
        /* IE and Edge */
        '-ms-overflow-style': 'auto',
  
        /* Firefox */
        'scrollbar-width': 'auto',
  
        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'block'
        }
      }
    }, ['responsive'])
  })],
};
