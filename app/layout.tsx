import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "mvicensss",
    template: "%s | mvicensss",
  },
  description: "Information Systems Engineering Student. Just a girl that loves to learn.",
  openGraph: {
    title: "mvicensss",
    description:
      "Information Systems Engineering Student. Just a girl that loves to learn.",
    url: "https://mvicensss.github.io",
    siteName: "mvicensss",
    images: [
      {
        url: "https://mvicensss.github.io/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const Seasons = LocalFont({
  src: "../public/fonts/the-seasons-regular.ttf",
  variable: "--font-seasons",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, Seasons.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        style={{ backgroundColor: '#4663ac' }}
        className={`bg-black font-seasons ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
