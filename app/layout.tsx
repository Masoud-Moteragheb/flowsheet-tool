import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Educational Flowsheet Tool",
  description: "Visual modeling tool for copper and zinc processing flowsheets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">
              FlowsheetEdu
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/flowsheet-tool" className="hover:text-blue-600">
                Flowsheet Tool
              </Link>
              <Link href="/docs" className="hover:text-blue-600">
                Docs
              </Link>
            </div>
          </nav>
        </header>
        <div className="max-w-6xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
