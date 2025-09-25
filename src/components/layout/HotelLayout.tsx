import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface HotelLayoutProps {
  children: ReactNode;
}

export function HotelLayout({ children }: HotelLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 bg-hotel-header border-b flex items-center px-4">
            <SidebarTrigger className="text-hotel-header-foreground" />
            <div className="ml-4">
              <h2 className="text-hotel-header-foreground font-semibold">
                Hotel Management System
              </h2>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}