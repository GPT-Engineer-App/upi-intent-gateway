import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, QrCode, Link } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Change to sidebar layout
import Index from "./pages/Index.jsx";
import DynamicQR from "./pages/DynamicQR.jsx";
import StaticQR from "./pages/StaticQR.jsx";
import LinkPayment from "./pages/LinkPayment.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Dynamic QR",
    to: "/dynamic-qr",
    icon: <QrCode className="h-4 w-4" />,
  },
  {
    title: "Static QR",
    to: "/static-qr",
    icon: <QrCode className="h-4 w-4" />,
  },
  {
    title: "Link Payment",
    to: "/link-payment",
    icon: <Link className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="dynamic-qr" element={<DynamicQR />} />
              <Route path="static-qr" element={<StaticQR />} />
              <Route path="link-payment" element={<LinkPayment />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;