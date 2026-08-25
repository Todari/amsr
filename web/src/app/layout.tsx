import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://amsr.todari.dev";
const title = "아무사람대잔치 | 친구의 친구를 만나는 파티";
const description =
  "2016년부터 이어진 아무사람대잔치. 한 번 왔던 사람은 새로운 사람을 데려오고, 처음 오는 사람은 혼자 와도 되는 32명의 파티입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "아무사람대잔치",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f1e6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
