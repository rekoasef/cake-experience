import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CAKÉ — Pastelería de Autor",
    template: "%s · CAKÉ Pastelería de Autor",
  },
  description:
    "No es un postre, es un instante. Tortas, tartas y cheesecakes de autor, elaborados a mano para tus días más especiales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-ivory text-espresso font-body antialiased">
        <CartProvider>
          <Nav />
          <CartDrawer />
          {children}
          <Footer />
        </CartProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#28130E",
              color: "#F8F1E9",
              border: "1px solid #3a241c",
              fontFamily: "var(--font-body)",
            },
            classNames: {
              description: "!text-[#F8F1E9]/70",
              actionButton: "!bg-[#F8F1E9] !text-[#1B0E0B] !font-semibold",
            },
          }}
        />
      </body>
    </html>
  );
}
