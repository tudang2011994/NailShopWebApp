
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import ClientProvider from "./ClientProvider";


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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider children={children} >
          <div id="root">  
            {children}
          </div>
        </ClientProvider>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                window.onscroll = function() {
                  var navbar = document.querySelector('.navbar');
                  if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                  } else {
                    navbar.classList.remove('scrolled');
                  }
                }
              `,
            }}
          />       
      </body>
    </html>

  );
}
