import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Users } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use the sidebar layout
import Index from "./pages/Index.jsx";
import ManageCustomers from "./pages/ManageCustomers.jsx";
import ManageEstimates from "./pages/ManageEstimates.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Estimates", // Changed from "Home" to "Estimates"
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
{
    title: "Customers", // Changed from "Manage Customers" to "Customers"
    to: "/manage-customers",
    icon: <Users className="h-4 w-4" />,
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
              <Route index element={<ManageEstimates />} />
              <Route path="/manage-customers" element={<ManageCustomers />} />
              {/* Removed the estimate-form route */}
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;