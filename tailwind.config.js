/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      dropShadow: {
        '3xl': '0px 0px 4px rgb(148 163 184)',
        
        '5xl': [
            '0 35px 35px rgb(8 145 178)',
            '0 45px 65px rgb(2 145 18)'
        ]
      },
      boxShadow: {
        '3xl': '0 0 5px 2px rgb(8 145 178)',
        '4xl': '8px -8px 2px rgb(8 145 178)',
        '5xl': '0 0 9px 5px #0891b2',
      },

      animation: {
        'spin-once': 'spin 1s ease-in-out 1',
        'ping-slow': 'ping 1.5s linear infinite',
      },
    
     colors: {
      'cur':'#0D141A'
    },
  },
  },
  plugins: [],
}

