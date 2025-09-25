import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HotelLayout } from "./components/layout/HotelLayout";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Guests from "./pages/Guests";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route
            path="/*"
            element={
              <HotelLayout>
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
              </HotelLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
