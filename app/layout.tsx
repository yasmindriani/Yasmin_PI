import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// import localFont from "next/font/local";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// const berrieFont = localFont({
//   src: "./fonts/BitcountPropDouble.ttf",
//   variable: "--font-berrie",
// });

// const enterFont = localFont({
//   src: "./fonts/BirdsOfParadise.ttf",
//   variable: "--font-enter",
// });

export const metadata: Metadata = {
  title: "Berrie Booth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double+Ink:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`
          ${poppins.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
