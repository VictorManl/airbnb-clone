import "@/styles/globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone whit Nextjs",
};

const font = Nunito({
  display: "swap",
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={font.style}>{children}</body>
    </html>
  );
}
