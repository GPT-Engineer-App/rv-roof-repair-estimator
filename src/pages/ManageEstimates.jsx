import { useState } from "react";
import { useEstimates, useAddEstimate, useUpdateEstimate, useDeleteEstimate, useCustomers } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ManageEstimates = () => {
  const { data: estimates, error: estimatesError, isLoading: estimatesLoading } = useEstimates();
  const { data: customers, error: customersError, isLoading: customersLoading } = useCustomers();
  const addEstimate = useAddEstimate();
  const updateEstimate = useUpdateEstimate();
  const deleteEstimate = useDeleteEstimate();

  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [formData, setFormData] = useState({
    estimate_number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    unit_description: "",
    vin: "",
    advisor: "",
    payment_type: "",
    deductible: "",
    estimate_date: "",
    repair_description: "",
    notes: "",
    hrs: "",
    labor_per_hr: "",
    sublet: "",
    extras: "",
    labor: "",
    shop_supplies: "",
    tax: "",
    total_estimate: "",
    customer_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = (value) => {
    const customer = customers.find((cust) => cust.customer_id === value);
    setFormData((prev) => ({
      ...prev,
      customer_id: value,
      first_name: customer.first_name,
      last_name: customer.last_name,
    }));
  };

  const handleAddEstimate = async () => {
    try {
      await addEstimate.mutateAsync(formData);
      toast("Estimate added successfully");
      setFormData({
        estimate_number: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        unit_description: "",
        vin: "",
        advisor: "",
        payment_type: "",
        deductible: "",
        estimate_date: "",
        repair_description: "",
        notes: "",
        hrs: "",
        labor_per_hr: "",
        sublet: "",
        extras: "",
        labor: "",
        shop_supplies: "",
        tax: "",
        total_estimate: "",
        customer_id: "",
      });
    } catch (error) {
      toast.error("Failed to add estimate");
    }
  };

  const handleUpdateEstimate = async () => {
    try {
      await updateEstimate.mutateAsync({ ...formData, estimate_id: selectedEstimate.estimate_id });
      toast("Estimate updated successfully");
      setSelectedEstimate(null);
      setFormData({
        estimate_number: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        unit_description: "",
        vin: "",
        advisor: "",
        payment_type: "",
        deductible: "",
        estimate_date: "",
        repair_description: "",
        notes: "",
        hrs: "",
        labor_per_hr: "",
        sublet: "",
        extras: "",
        labor: "",
        shop_supplies: "",
        tax: "",
        total_estimate: "",
        customer_id: "",
      });
    } catch (error) {
      toast.error("Failed to update estimate");
    }
  };

  const handleDeleteEstimate = async (estimate_id) => {
    try {
      await deleteEstimate.mutateAsync(estimate_id);
      toast("Estimate deleted successfully");
    } catch (error) {
      toast.error("Failed to delete estimate");
    }
  };

  const handleEditClick = (estimate) => {
    setSelectedEstimate(estimate);
    setFormData({
      estimate_number: estimate.estimate_number,
      first_name: estimate.first_name,
      last_name: estimate.last_name,
      phone_number: estimate.phone_number,
      unit_description: estimate.unit_description,
      vin: estimate.vin,
      advisor: estimate.advisor,
      payment_type: estimate.payment_type,
      deductible: estimate.deductible,
      estimate_date: estimate.estimate_date,
      repair_description: estimate.repair_description,
      notes: estimate.notes,
      hrs: estimate.hrs,
      labor_per_hr: estimate.labor_per_hr,
      sublet: estimate.sublet,
      extras: estimate.extras,
      labor: estimate.labor,
      shop_supplies: estimate.shop_supplies,
      tax: estimate.tax,
      total_estimate: estimate.total_estimate,
      customer_id: estimate.customer_id,
    });
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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Estimate</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEstimate ? "Edit Estimate" : "Add Estimate"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="estimate_number"
              placeholder="Estimate Number"
              value={formData.estimate_number}
              onChange={handleInputChange}
            />
            <Select onValueChange={handleCustomerChange} value={formData.customer_id}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.customer_id} value={customer.customer_id}>
                    {customer.first_name} {customer.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled
            />
            <Input
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <Input
              name="unit_description"
              placeholder="Unit Description"
              value={formData.unit_description}
              onChange={handleInputChange}
            />
            <Input
              name="vin"
              placeholder="VIN"
              value={formData.vin}
              onChange={handleInputChange}
            />
            <Input
              name="advisor"
              placeholder="Advisor"
              value={formData.advisor}
              onChange={handleInputChange}
            />
            <Input
              name="payment_type"
              placeholder="Payment Type"
              value={formData.payment_type}
              onChange={handleInputChange}
            />
            <Input
              name="deductible"
              placeholder="Deductible"
              value={formData.deductible}
              onChange={handleInputChange}
            />
            <Input
              name="estimate_date"
              placeholder="Estimate Date"
              value={formData.estimate_date}
              onChange={handleInputChange}
            />
            <Input
              name="repair_description"
              placeholder="Repair Description"
              value={formData.repair_description}
              onChange={handleInputChange}
            />
            <Input
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
            <Input
              name="hrs"
              placeholder="Hours"
              value={formData.hrs}
              onChange={handleInputChange}
            />
            <Input
              name="labor_per_hr"
              placeholder="Labor per Hour"
              value={formData.labor_per_hr}
              onChange={handleInputChange}
            />
            <Input
              name="sublet"
              placeholder="Sublet"
              value={formData.sublet}
              onChange={handleInputChange}
            />
            <Input
              name="extras"
              placeholder="Extras"
              value={formData.extras}
              onChange={handleInputChange}
            />
            <Input
              name="labor"
              placeholder="Labor"
              value={formData.labor}
              onChange={handleInputChange}
            />
            <Input
              name="shop_supplies"
              placeholder="Shop Supplies"
              value={formData.shop_supplies}
              onChange={handleInputChange}
            />
            <Input
              name="tax"
              placeholder="Tax"
              value={formData.tax}
              onChange={handleInputChange}
            />
            <Input
              name="total_estimate"
              placeholder="Total Estimate"
              value={formData.total_estimate}
              onChange={handleInputChange}
            />
            <Button
              type="button"
              onClick={selectedEstimate ? handleUpdateEstimate : handleAddEstimate}
              className="col-span-1 md:col-span-2"
            >
              {selectedEstimate ? "Update Estimate" : "Add Estimate"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEstimates;