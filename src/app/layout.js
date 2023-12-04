import store from "@/redux/store";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Cairo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/redux/Providers";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata = {
  title: "XO Game",
  description: "XO Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        <Providers >{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
