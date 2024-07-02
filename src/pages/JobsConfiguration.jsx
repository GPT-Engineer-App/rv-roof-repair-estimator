import { useState } from "react";
import { usePreConfiguredJobs, useAddPreConfiguredJob, useUpdatePreConfiguredJob, useDeletePreConfiguredJob } from "@/integrations/supabase/index.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const JobsConfiguration = () => {
  const { data: jobs, error, isLoading } = usePreConfiguredJobs();
  const addJob = useAddPreConfiguredJob();
  const updateJob = useUpdatePreConfiguredJob();
  const deleteJob = useDeletePreConfiguredJob();

  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    job_code: "",
    job_name: "",
    job_description: "",
    roof_kit: "",
    roof_membrane: "",
    slf_lvl_dicor: "",
    non_lvl_dicor: "",
    roof_screws: "",
    glue: "",
    additional_parts: "",
    repair_description: "",
    hrs: "",
    labor_per_hr: "",
    job_price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddJob = async () => {
    try {
      await addJob.mutateAsync(formData);
      toast("Job added successfully");
      setFormData({
        job_code: "",
        job_name: "",
        job_description: "",
        roof_kit: "",
        roof_membrane: "",
        slf_lvl_dicor: "",
        non_lvl_dicor: "",
        roof_screws: "",
        glue: "",
        additional_parts: "",
        repair_description: "",
        hrs: "",
        labor_per_hr: "",
        job_price: "",
      });
      setSelectedJob(null);
    } catch (error) {
      toast.error("Failed to add job");
    }
  };

  const handleUpdateJob = async () => {
    try {
      await updateJob.mutateAsync({ ...formData, id: selectedJob.id });
      toast("Job updated successfully");
      setSelectedJob(null);
      setFormData({
        job_code: "",
        job_name: "",
        job_description: "",
        roof_kit: "",
        roof_membrane: "",
        slf_lvl_dicor: "",
        non_lvl_dicor: "",
        roof_screws: "",
        glue: "",
        additional_parts: "",
        repair_description: "",
        hrs: "",
        labor_per_hr: "",
        job_price: "",
      });
    } catch (error) {
      toast.error("Failed to update job");
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob.mutateAsync(id);
      toast("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setFormData({
      job_code: job.job_code,
      job_name: job.job_name,
      job_description: job.job_description,
      roof_kit: job.roof_kit,
      roof_membrane: job.roof_membrane,
      slf_lvl_dicor: job.slf_lvl_dicor,
      non_lvl_dicor: job.non_lvl_dicor,
      roof_screws: job.roof_screws,
      glue: job.glue,
      additional_parts: job.additional_parts,
      repair_description: job.repair_description,
      hrs: job.hrs,
      labor_per_hr: job.labor_per_hr,
      job_price: job.job_price,
    });
  };

  const handleDialogClose = () => {
    setSelectedJob(null);
    setFormData({
      job_code: "",
      job_name: "",
      job_description: "",
      roof_kit: "",
      roof_membrane: "",
      slf_lvl_dicor: "",
      non_lvl_dicor: "",
      roof_screws: "",
      glue: "",
      additional_parts: "",
      repair_description: "",
      hrs: "",
      labor_per_hr: "",
      job_price: "",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Jobs Configuration</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Code</TableHead>
            <TableHead>Job Name</TableHead>
            <TableHead>Job Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.job_code}</TableCell>
              <TableCell>{job.job_name}</TableCell>
              <TableCell>{job.job_description}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditClick(job)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Job</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedJob ? "Edit Job" : "Create Job"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input
              name="job_code"
              placeholder="Job Code"
              value={formData.job_code}
              onChange={handleInputChange}
            />
            <Input
              name="job_name"
              placeholder="Job Name"
              value={formData.job_name}
              onChange={handleInputChange}
            />
            <Input
              name="job_description"
              placeholder="Job Description"
              value={formData.job_description}
              onChange={handleInputChange}
            />
            <Input
              name="roof_kit"
              placeholder="Roof Kit"
              value={formData.roof_kit}
              onChange={handleInputChange}
            />
            <Input
              name="roof_membrane"
              placeholder="Roof Membrane"
              value={formData.roof_membrane}
              onChange={handleInputChange}
            />
            <Input
              name="slf_lvl_dicor"
              placeholder="Self Leveling Dicor"
              value={formData.slf_lvl_dicor}
              onChange={handleInputChange}
            />
            <Input
              name="non_lvl_dicor"
              placeholder="Non Leveling Dicor"
              value={formData.non_lvl_dicor}
              onChange={handleInputChange}
            />
            <Input
              name="roof_screws"
              placeholder="Roof Screws"
              value={formData.roof_screws}
              onChange={handleInputChange}
            />
            <Input
              name="glue"
              placeholder="Glue"
              value={formData.glue}
              onChange={handleInputChange}
            />
            <Input
              name="additional_parts"
              placeholder="Additional Parts"
              value={formData.additional_parts}
              onChange={handleInputChange}
            />
            <Input
              name="repair_description"
              placeholder="Repair Description"
              value={formData.repair_description}
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
              name="job_price"
              placeholder="Job Price"
              value={formData.job_price}
              onChange={handleInputChange}
            />
            <Button
              type="button"
              onClick={selectedJob ? handleUpdateJob : handleAddJob}
            >
              {selectedJob ? "Update Job" : "Create Job"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsConfiguration;