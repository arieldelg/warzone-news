import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Provider";
import { CardContextProvider } from "app/context/card-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warone News",
  description: "Everything about Warzone and MP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <CardContextProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </CardContextProvider>
      </body>
    </html>
  );
}
