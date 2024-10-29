// 수정금지

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "MoZip",
  description: "Making club management and recruiting more convenient",
  icons: {
    icon: "/logo_TapImg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
