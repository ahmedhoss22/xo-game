import store from "@/redux/store";
import "./globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Cairo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/redux/Providers"; 
// import '../config/translation'

const cairo = Cairo({
  subsets: ["latin"],
  weight: [ '300',"400", "500", "700",'600','800', "900",'1000'],
});

export const metadata = {
  title: "XO Game",
  description: "XO Game",
};

export default function RootLayout({ children  }) {
   return (
    <html lang='en'>
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2257125770897791"
     crossorigin="anonymous"></script>
      </head>
      <body className={cairo.className}>      
         <Providers>
            {children}
        </Providers>   
         <ToastContainer />
      </body>
    </html>
  );
}
 
