import { SidebarProvider, SidebarTrigger } from "@repo/ui";
import Dashboard from "../../components/dashboard/dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <Dashboard />
        <SidebarTrigger />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </SidebarProvider>
  );
}
