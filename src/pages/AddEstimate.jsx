import { useState } from "react";
import { useAddEstimate, useAdvisors } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddEstimate = () => {
  const [formData, setFormData] = useState({
    estimate_number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    unit_description: "",
    vin: "",
    advisor_id: "", // Updated to store advisor_id
    payment_type: "",
    deductible: "",
    estimate_date: "",
    roof_kit: "",
    roof_membrane: "",
    slf_lvl_dicor: "",
    non_lvl_dicor: "",
    roof_screws: "",
    glue: "",
    additional_parts: "",
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
    job_code: "",
    parts_configuration: "",
    labor_configuration: "",
    customer_id: "",
  });

  const addEstimate = useAddEstimate();
  const { data: advisors, error: advisorsError, isLoading: advisorsLoading } = useAdvisors();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEstimate.mutateAsync(formData);
      toast("Estimate added successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add estimate");
    }
  };

  if (advisorsLoading) return <div>Loading...</div>;
  if (advisorsError) return <div>Error loading advisors</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Estimate</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input name="estimate_number" placeholder="Estimate Number" value={formData.estimate_number} onChange={handleInputChange} />
        <Input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} />
        <Input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} />
        <Input name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleInputChange} />
        <Input name="unit_description" placeholder="Unit Description" value={formData.unit_description} onChange={handleInputChange} />
        <Input name="vin" placeholder="VIN" value={formData.vin} onChange={handleInputChange} />
        <div>
          <label className="block text-sm font-medium text-gray-700">Advisor</label>
          <Select onValueChange={(value) => handleSelectChange("advisor_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an advisor" />
            </SelectTrigger>
            <SelectContent>
              {advisors.map((advisor) => (
                <SelectItem key={advisor.advisor_id} value={advisor.advisor_id}>
                  {advisor.advisor_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Select onValueChange={(value) => handleSelectChange("payment_type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Payment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="credit">Credit</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSelectChange("deductible", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Deductible" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">$0</SelectItem>
            <SelectItem value="250">$250</SelectItem>
            <SelectItem value="500">$500</SelectItem>
            <SelectItem value="750">$750</SelectItem>
            <SelectItem value="1000">$1000</SelectItem>
          </SelectContent>
        </Select>
        <Input name="estimate_date" placeholder="Estimate Date" value={formData.estimate_date} onChange={handleInputChange} />
        <Input name="roof_kit" placeholder="Roof Kit" value={formData.roof_kit} onChange={handleInputChange} />
        <Input name="roof_membrane" placeholder="Roof Membrane" value={formData.roof_membrane} onChange={handleInputChange} />
        <Input name="slf_lvl_dicor" placeholder="Self Leveling Dicor" value={formData.slf_lvl_dicor} onChange={handleInputChange} />
        <Input name="non_lvl_dicor" placeholder="Non Leveling Dicor" value={formData.non_lvl_dicor} onChange={handleInputChange} />
        <Input name="roof_screws" placeholder="Roof Screws" value={formData.roof_screws} onChange={handleInputChange} />
        <Input name="glue" placeholder="Glue" value={formData.glue} onChange={handleInputChange} />
        <Input name="additional_parts" placeholder="Additional Parts" value={formData.additional_parts} onChange={handleInputChange} />
        <Textarea name="repair_description" placeholder="Repair Description" value={formData.repair_description} onChange={handleInputChange} />
        <Textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleInputChange} />
        <Input name="hrs" placeholder="Hours" value={formData.hrs} onChange={handleInputChange} />
        <Input name="labor_per_hr" placeholder="Labor per Hour" value={formData.labor_per_hr} onChange={handleInputChange} />
        <Input name="sublet" placeholder="Sublet" value={formData.sublet} onChange={handleInputChange} />
        <Input name="extras" placeholder="Extras" value={formData.extras} onChange={handleInputChange} />
        <Input name="labor" placeholder="Labor" value={formData.labor} onChange={handleInputChange} />
        <Input name="shop_supplies" placeholder="Shop Supplies" value={formData.shop_supplies} onChange={handleInputChange} />
        <Input name="tax" placeholder="Tax" value={formData.tax} onChange={handleInputChange} />
        <Input name="total_estimate" placeholder="Total Estimate" value={formData.total_estimate} onChange={handleInputChange} />
        <Input name="job_code" placeholder="Job Code" value={formData.job_code} onChange={handleInputChange} />
        <Input name="parts_configuration" placeholder="Parts Configuration" value={formData.parts_configuration} onChange={handleInputChange} />
        <Input name="labor_configuration" placeholder="Labor Configuration" value={formData.labor_configuration} onChange={handleInputChange} />
        <Input name="customer_id" placeholder="Customer ID" value={formData.customer_id} onChange={handleInputChange} />
        <Button type="submit" className="w-full">Add Estimate</Button>
      </form>
    </div>
  );
};

export default AddEstimate;