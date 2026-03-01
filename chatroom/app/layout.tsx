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
          <div className="flex h-30 shrink-0 rounded-3xl bg-gray-200 p-10 m-5 items-center justify-center">
            <h1 className="text-gray-900 flex flex-col text-[clamp(3rem,6vw,5rem)]">Chatroom</h1>
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}
