"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  delete: z.boolean().default(false).optional(),
});

export function DeleteStudentForm({ studentName, deleteStudent, _id }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  function onSubmit(e) {
    deleteStudent(_id);
  }
  const isChecked = watch("delete");

  return (
    <div className="rounded-md border bg-white">
      <Form {...form}>
        <div className="p-6">
          <form onSubmit={onSubmit} className="">
            <h2 className="text-lg font-semibold mb-4">Delete Student</h2>
            <FormField
              control={form.control}
              name="delete"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                  <FormControl>
                    <Checkbox
                      {...register("delete")}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Are you sure you want to delete the student{" "}
                      <span className="font-semibold">{studentName}</span>?{" "}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="mt-6 flex justify-end">
              {isChecked ? (
                <Button type="submit">
                  Delete
                </Button>
              ) : (
                <Button disabled type="button">
                  Delete
                </Button>
              )}
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
