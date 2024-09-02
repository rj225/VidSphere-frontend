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
        'left-top':'5px 5px 1px 2px rgb(8 145 178)',
        'right-top':'-2px 2px 1px 2px #1C3E3F',
        '3xl': '0 0 5px 2px rgb(8 145 178)',
        '4xl': '8px -8px 2px rgb(8 145 178)',
        '5xl': '0 0 9px 5px #0891b2',
      },

      animation: {
        'spin-once': 'spin 1s ease-in-out 1',
        'ping-slow': 'ping 1.5s linear infinite',
        // 'bounce-slow': 'bounce 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
      },
    
     colors: {
      'cur':'#0D141A'
    },
  },
  },
  plugins: [],
}

