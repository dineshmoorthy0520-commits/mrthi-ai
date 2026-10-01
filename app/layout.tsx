import "./globals.css";

export const metadata = {
  title: "MRthi AI",
  description: "Your AI guide, in your language.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
