import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const msblock = localFont({
  src: "../assets/fonts/msblock.otf",
  variable: "--font-msblock",
});

const geogorda = localFont({
  src: "../assets/fonts/gl.ttf",
  variable: "--font-geogorda",
});

const dm = localFont({
  src: "../assets/fonts/dm.ttf",
  variable: "--font-dm",
});

export const metadata: Metadata = {
	title: 'წიგნი | ქართული ენათმეცნიერების პლატფორმა',
	description: 'ქართული ენათმეცნიერების პლატფორმა',
	icons: {
		icon: '/images/logo.png',
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${msblock.variable} ${geogorda.variable} ${dm.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
