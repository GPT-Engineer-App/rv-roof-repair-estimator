import { useState } from "react";
import { useEstimates, useDeleteEstimate, useCustomers } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ManageEstimates = () => {
  const { data: estimates, error: estimatesError, isLoading: estimatesLoading } = useEstimates();
  const { data: customers, error: customersError, isLoading: customersLoading } = useCustomers();
  const deleteEstimate = useDeleteEstimate();
  const navigate = useNavigate();

  const handleDeleteEstimate = async (estimate_id) => {
    try {
      await deleteEstimate.mutateAsync(estimate_id);
      toast("Estimate deleted successfully");
    } catch (error) {
      toast.error("Failed to delete estimate");
    }
  };

  const handleAddEstimateClick = () => {
    navigate("/estimate-form");
  };

  const handleEditClick = (estimate) => {
    navigate(`/estimate-form/${estimate.estimate_id}`);
  };

  if (estimatesLoading || customersLoading) return <div>Loading...</div>;
  if (estimatesError || customersError) return <div>Error loading data</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Estimates</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estimate Number</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Unit Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estimates.map((estimate) => (
            <TableRow key={estimate.estimate_id}>
              <TableCell>{estimate.estimate_number}</TableCell>
              <TableCell>{estimate.first_name}</TableCell>
              <TableCell>{estimate.last_name}</TableCell>
              <TableCell>{estimate.phone_number}</TableCell>
              <TableCell>{estimate.unit_description}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditClick(estimate)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteEstimate(estimate.estimate_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={handleAddEstimateClick}>Add Estimate</Button>
    </div>
  );
};

export default ManageEstimates;