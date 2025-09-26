import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HotelLayout } from "./components/layout/HotelLayout";

// Lazy load pages for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Reservations = lazy(() => import("./pages/Reservations"));
const CheckIn = lazy(() => import("./pages/CheckIn"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Guests = lazy(() => import("./pages/Guests"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Login />
            </Suspense>
          } />
          <Route path="/signup" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Login />
            </Suspense>
          } />
          <Route
            path="/*"
            element={
              <HotelLayout>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/checkin" element={<CheckIn />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/guests" element={<Guests />} />
                    <Route path="/rooms" element={<Dashboard />} />
                    <Route path="/housekeeping" element={<Dashboard />} />
                    <Route path="/reports" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </HotelLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
