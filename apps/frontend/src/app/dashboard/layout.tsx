
import Navbar from "../../components/dashboard/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="p-8 w-full bg-background">{children}</div>
    </div>
  );
}
