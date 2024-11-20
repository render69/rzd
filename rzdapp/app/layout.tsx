// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: 'RussianBears',
  // description: 'Your website description',
  icons: {
    icon: '/favicons/favicon512.ico',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ru">
      <body>
        {/* <LanguageProvider> */}
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        {/* </LanguageProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
