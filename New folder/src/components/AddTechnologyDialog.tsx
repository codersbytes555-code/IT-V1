import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTechSchema, type CreateTechInput } from "@/types/technology";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { createTechnology } from "@/services/techService";
import { useState } from "react";

interface Props {
  onSuccess: () => void;
}

export function AddTechnologyDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateTechInput>({
    resolver: zodResolver(CreateTechSchema),
    defaultValues: {
      name: "",
      category: "LIBRARIES",
    },
  });

  const onSubmit = async (data: CreateTechInput) => {
    try {
      setLoading(true);
      await createTechnology(data);
      onSuccess();
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to add technology:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Technology
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Technology</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} placeholder="e.g. React, Node.js" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              onValueChange={(value) => setValue("category", value as any)}
              defaultValue="LIBRARIES"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FRONTEND">Frontend</SelectItem>
                <SelectItem value="BACKEND">Backend</SelectItem>
                <SelectItem value="DATABASE">Database</SelectItem>
                <SelectItem value="TOOLS">Tools</SelectItem>
                <SelectItem value="DATA_SCIENCE">Data Science</SelectItem>
                <SelectItem value="LIBRARIES">Libraries</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Technology"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
