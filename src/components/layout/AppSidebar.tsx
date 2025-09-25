import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Bed,
  ClipboardList,
  BarChart3,
  LogIn,
  UserPlus,
  ChevronDown,
  Hotel,
  UserCheck,
  UserX
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Reservations", url: "/reservations", icon: Calendar },
  { title: "Check In", url: "/checkin", icon: UserCheck },
  { title: "Check Out", url: "/checkout", icon: UserX },
  { title: "Guests", url: "/guests", icon: Users },
  { title: "Rooms", url: "/rooms", icon: Bed },
  { title: "Housekeeping", url: "/housekeeping", icon: ClipboardList },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

const authItems = [
  { title: "Login", url: "/login", icon: LogIn },
  { title: "Sign Up", url: "/signup", icon: UserPlus },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-sidebar-primary" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* Hotel PMS Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Hotel className="h-6 w-6 text-sidebar-primary" />
            {state === "expanded" && (
              <h1 className="font-bold text-lg text-sidebar-foreground">Hotel PMS</h1>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-xs uppercase tracking-wider px-4 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-none transition-colors ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Authentication */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-xs uppercase tracking-wider px-4 py-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-none transition-colors ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sidebar Toggle at bottom */}
        <div className="mt-auto p-4">
          <SidebarTrigger className="w-full justify-center" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}