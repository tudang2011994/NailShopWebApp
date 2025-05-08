import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import ClientProvider from "./ClientProvider";
import Script from "next/script";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bee You Nail & Spa",
  description: "Bee You Nail & Spa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* ✅ Preload Google Fonts to reduce render-blocking */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap"
          />
        </noscript>
        {/* <Script
          id="google-ads-script"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16852708460');
          `}
        </Script> */}

        <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','AW-16852708460');
                `,
              }}
            />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=AW-16852708460"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <ClientProvider>
          <div id="root">{children}</div>
        </ClientProvider>

        {/* ✅ Use Next.js <Script> for better performance */}
        <Script id="navbar-scroll-effect" strategy="afterInteractive">
          {`
            window.addEventListener("scroll", function() {
              var navbar = document.querySelector('.navbar');
              if (navbar) {
                if (window.scrollY > 50) {
                  navbar.classList.add('scrolled');
                } else {
                  navbar.classList.remove('scrolled');
                }
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
