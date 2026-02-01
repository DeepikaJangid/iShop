import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import MainContext from "@/context/main-context";
import SearchCategory from "@/components/website/SearchCategory";
import ReduxProvider from "@/redux/ReduxProvider";
// import Animation from "@/components/website/Animation";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    <ReduxProvider>
      <MainContext>
        <Header />
        <SearchCategory />
        {/* <Animation /> */}
        {children}
        <Footer />
      </MainContext>
    </ReduxProvider>
    //   </body>
    // </html >
  );
}