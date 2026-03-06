import Link from "next/link";
import "./globals.css";
import { bitcount } from "../ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bitcount.className} antialiased`}>
        <main className="flex items-center overflow-hidden h-screen flex-col p-6 gap-6 bg-shadow-grey">
          {/* header */}
          <Link 
            href="/"
            className="flex h-1/5 max-h-30 rounded-3xl bg-lavender p-10 items-center justify-center drop-shadow-black drop-shadow-lg">
            <span className="text-gray-900 flex flex-col text-[clamp(3rem,6vw,5rem)]">Chatroom</span>
          </Link>

          {children}
        </main>
      </body>
    </html>
  );
}
