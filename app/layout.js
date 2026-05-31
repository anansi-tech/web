import localFont from "next/font/local";
import { DM_Sans, JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

// const display = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-display",
// });

// const display = Syne({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-display",
// });

// const display = localFont({
//   src: "./fonts/ClashDisplay-Variable.woff2",
//   variable: "--font-display",
// });

const display = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-display",
});

// const body = localFont({
//   src: "./fonts/Satoshi-Variable.woff2",
//   variable: "--font-body",
// });

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL("https://anansi.xyz"),
  title: "Anansi Technology LLC",
  description: "Applied AI and decentralized software for markets the world has ignored.",
  icons: {
    icon: [
      { url: "/v5/favicon/wordmark/favicon.svg", type: "image/svg+xml" },
      { url: "/v5/favicon/wordmark/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/v5/favicon/wordmark/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/v5/favicon/wordmark/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/v5/favicon/wordmark/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/v5/favicon/wordmark/favicon-180.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/v5/favicon/wordmark/favicon-32.png"],
  },
  openGraph: {
    title: "Anansi Technology LLC",
    description: "Applied AI and decentralized software for markets the world has ignored.",
    url: "https://anansi.xyz",
    siteName: "Anansi",
    type: "website",
    images: [{ url: "/v5/social/anansi-social-card-1200x630.png", width: 1200, height: 630, alt: "Anansi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anansi Technology LLC",
    description: "Applied AI and decentralized software for markets the world has ignored.",
    images: ["/v5/social/anansi-social-card-1200x630.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} bg-anansi-black text-anansi-white font-body min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
