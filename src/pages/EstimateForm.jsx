import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAddEstimate, useUpdateEstimate, useEstimate } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const EstimateForm = () => {
  const { estimateId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(estimateId);

  const { data: estimate, isLoading, error } = useEstimate(estimateId, {
    enabled: isEditing,
  });

  const addEstimate = useAddEstimate();
  const updateEstimate = useUpdateEstimate();

  const [formData, setFormData] = useState({
    estimate_number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    unit_description: "",
    repair_description: "",
  });

  useEffect(() => {
    if (estimate) {
      setFormData({
        estimate_number: estimate.estimate_number,
        first_name: estimate.first_name,
        last_name: estimate.last_name,
        phone_number: estimate.phone_number,
        unit_description: estimate.unit_description,
        repair_description: estimate.repair_description,
      });
    }
  }, [estimate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateEstimate.mutateAsync({ ...formData, estimate_id: estimateId });
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading estimate</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? "Edit Estimate" : "Add Estimate"}</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="estimate_number"
          placeholder="Estimate Number"
          value={formData.estimate_number}
          onChange={handleInputChange}
          required
        />
        <Input
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        <Input
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
        <Input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
        />
        <Input
          name="unit_description"
          placeholder="Unit Description"
          value={formData.unit_description}
          onChange={handleInputChange}
          required
        />
        <Textarea
          name="repair_description"
          placeholder="Repair Description"
          value={formData.repair_description}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" className="w-full">
          {isEditing ? "Update Estimate" : "Add Estimate"}
        </Button>
      </form>
    </div>
  );
};

export default EstimateForm;