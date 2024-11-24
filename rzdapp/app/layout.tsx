// import type { Metadata } from "next";
import localFont from "next/font/local";
import styles from "./style/Home.module.css";

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
        <div className={styles.container123}>
    {/* <LanguageProvider> */}
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        {/* </LanguageProvider> */}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
