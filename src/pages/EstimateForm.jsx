import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddEstimate, useUpdateEstimate, useEstimate, useCustomers, usePreConfiguredJobs } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const EstimateForm = () => {
  const { estimate_id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(estimate_id);

  const { data: customers, error: customersError, isLoading: customersLoading } = useCustomers();
  const { data: estimate, error: estimateError, isLoading: estimateLoading } = useEstimate(estimate_id, {
    enabled: isEditMode,
  });
  const { data: jobs, error: jobsError, isLoading: jobsLoading } = usePreConfiguredJobs();

  const addEstimate = useAddEstimate();
  const updateEstimate = useUpdateEstimate();

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
    job_code: "",
  });

  useEffect(() => {
    if (isEditMode && estimate) {
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
        job_code: estimate.job_code,
      });
    }
  }, [isEditMode, estimate]);

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

  const handleJobChange = (value) => {
    const job = jobs.find((job) => job.job_code === value);
    setFormData((prev) => ({
      ...prev,
      job_code: value,
      repair_description: job.job_description,
      hrs: job.hrs,
      labor_per_hr: job.labor_per_hr,
      total_estimate: job.job_price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateEstimate.mutateAsync({ ...formData, estimate_id });
        toast("Estimate updated successfully");
      } else {
        await addEstimate.mutateAsync(formData);
        toast("Estimate added successfully");
      }
      navigate("/manage-estimates");
    } catch (error) {
      toast.error("Failed to save estimate");
    }
  };

  if (estimateLoading || customersLoading || jobsLoading) return <div>Loading...</div>;
  if (estimateError || customersError || jobsError) return <div>Error loading data</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{isEditMode ? "Edit Estimate" : "Add Estimate"}</h1>
      <form className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
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
        <Select onValueChange={handleJobChange} value={formData.job_code}>
          <SelectTrigger>
            <SelectValue placeholder="Select a job" />
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.job_code} value={job.job_code}>
                {job.job_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Button type="submit" className="col-span-1 md:col-span-2">
          {isEditMode ? "Update Estimate" : "Add Estimate"}
        </Button>
      </form>
    </div>
  );
};

export default EstimateForm;