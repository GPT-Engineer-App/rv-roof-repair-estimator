import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [job, setJob] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [deductible, setDeductible] = useState("");

  const handleJobChange = (value) => setJob(value);
  const handleCustomerTypeChange = (value) => setCustomerType(value);
  const handleDeductibleChange = (value) => setDeductible(value);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">RV Roof Repair Estimate Builder</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Job</label>
          <Select onValueChange={handleJobChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="job1">Job 1</SelectItem>
              <SelectItem value="job2">Job 2</SelectItem>
              <SelectItem value="job3">Job 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Type</label>
          <Select onValueChange={handleCustomerTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dealership">Dealership</SelectItem>
              <SelectItem value="warranty">Warranty</SelectItem>
              <SelectItem value="extended_warranty">Extended Warranty</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deductible</label>
          <Select onValueChange={handleDeductibleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select deductible amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">$0</SelectItem>
              <SelectItem value="250">$250</SelectItem>
              <SelectItem value="500">$500</SelectItem>
              <SelectItem value="750">$750</SelectItem>
              <SelectItem value="1000">$1000</SelectItem>
              <SelectItem value="1250">$1250</SelectItem>
              <SelectItem value="1500">$1500</SelectItem>
              <SelectItem value="1750">$1750</SelectItem>
              <SelectItem value="2000">$2000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Details</label>
          <Input placeholder="Name" className="mb-2" />
          <Input placeholder="Address" className="mb-2" />
          <Input placeholder="Phone Number" className="mb-2" />
          <Input placeholder="Email (optional)" className="mb-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Details</label>
          <Input placeholder="Year" className="mb-2" />
          <Input placeholder="Make" className="mb-2" />
          <Input placeholder="Model" className="mb-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Repair Description</label>
          <Textarea placeholder="Describe the repair" />
        </div>

        <Button type="submit" className="w-full">Generate Estimate</Button>
      </form>
    </div>
  );
};

export default Index;