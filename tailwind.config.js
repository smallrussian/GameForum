/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {minHeight:{
      '60':'60px',
      '40': '40px',
      '32': '32px'
    },
    minWidth:{
      '40': '40px'
    },
  maxHeight: {
    '60':'60px'
  },
  width:{
    '250':'250'
  },
  padding:{
    '8':'8px'
  },
  margin:{
    '8px': '0 0 8px 0'
  },
  backgroundColor: {
    'primary': '#f3f4f6',
    'secondary': '#1f2937',
    'accent': '#3b82f6',
  },
  textColor: {
    'primary': '#1f2937',
    'secondary': '#f3f4f6',
    'accent': '#3b82f6',
  },
  borderRadius: {
    'xl': '1rem',
  },
},
  },
  plugins: [],
}