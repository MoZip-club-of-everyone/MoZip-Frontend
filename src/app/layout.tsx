// 수정금지

import type { Metadata } from "next";
import "../globals.css";
import Container from "../components/Container";
import StyledComponentsRegistry from "@/lib/registry";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
// import RecoilRootWrapper from "./RecoilWrapper";

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
        {/* <RecoilRootWrapper> */}
          <StyledComponentsRegistry>
            <ThemeProviderWrapper>
                <Container>{children}</Container>
            </ThemeProviderWrapper>
          </StyledComponentsRegistry>
        {/* </RecoilRootWrapper> */}
      </body>
    </html>
  );
}
