import { useState } from "react";
import { useCustomers, useAddCustomer, useUpdateCustomer, useDeleteCustomer } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const ManageCustomers = () => {
  const { data: customers, error, isLoading } = useCustomers();
  const addCustomer = useAddCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = async () => {
    try {
      await addCustomer.mutateAsync(formData);
      toast("Customer added successfully");
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: "",
      });
    } catch (error) {
      toast.error("Failed to add customer");
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await updateCustomer.mutateAsync({ ...formData, customer_id: selectedCustomer.customer_id });
      toast("Customer updated successfully");
      setSelectedCustomer(null);
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: "",
      });
    } catch (error) {
      toast.error("Failed to update customer");
    }
  };

  const handleDeleteCustomer = async (customer_id) => {
    try {
      await deleteCustomer.mutateAsync(customer_id);
      toast("Customer deleted successfully");
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone_number: customer.phone_number,
      email: customer.email,
      address: customer.address,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Customers</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.customer_id}>
              <TableCell>{customer.first_name}</TableCell>
              <TableCell>{customer.last_name}</TableCell>
              <TableCell>{customer.phone_number}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditClick(customer)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteCustomer(customer.customer_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Customer</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCustomer ? "Edit Customer" : "Add Customer"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
            <Input
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <Button
              type="button"
              onClick={selectedCustomer ? handleUpdateCustomer : handleAddCustomer}
            >
              {selectedCustomer ? "Update Customer" : "Add Customer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCustomers;