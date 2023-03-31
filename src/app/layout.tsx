import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import { LoginModal, Navbar, RegisterModal } from "./components";
import getCurrentUser from "./actions/getCurrentUser";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currenUser = await getCurrentUser();

  return (
    <html lang="es">
      <body style={font.style}>
        <Navbar currentUser={currenUser} />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
