import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use the sidebar layout
import Index from "./pages/Index.jsx";
import ManageCustomers from "./pages/ManageCustomers.jsx";
import ManageEstimates from "./pages/ManageEstimates.jsx";
import EstimateForm from "./pages/EstimateForm.jsx"; // Import the new EstimateForm page

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/",
    icon: <Home className="h-4 w-4" />,
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
              <Route path="/manage-customers" element={<ManageCustomers />} />
              <Route path="/manage-estimates" element={<ManageEstimates />} />
              <Route path="/estimate-form" element={<EstimateForm />} /> {/* Add the new route */}
              <Route path="/estimate-form/:estimateId" element={<EstimateForm />} /> {/* Add the new route for editing */}
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;