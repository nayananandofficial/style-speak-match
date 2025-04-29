
import { ReactNode } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { ShoppingProvider } from "@/contexts/ShoppingContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ShoppingProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ShoppingProvider>
  );
};

export default Layout;
