import Link from "next/link";
import "./globals.css";
import { bitcount } from "./ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bitcount.className} antialiased`}>
        <main className="flex items-center min-h-screen flex-col p-6">
          {/* header */}
          <Link 
            href="/"
            className="flex h-30 shrink-0 rounded-3xl bg-gray-200 p-10 m-5 items-center justify-center">
            <span className="text-gray-900 flex flex-col text-[clamp(3rem,6vw,5rem)]">Chatroom</span>
          </Link>

          {children}
        </main>
      </body>
    </html>
  );
}
