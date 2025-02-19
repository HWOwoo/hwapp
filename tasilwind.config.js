module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",  // pages 디렉토리 (Next.js 12 이하)
      "./components/**/*.{js,ts,jsx,tsx}",  // components 폴더
      "./app/**/*.{js,ts,jsx,tsx}",  // Next.js 13+ (App Router 사용 시 필요)
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  