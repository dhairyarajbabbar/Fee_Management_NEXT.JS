"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const today = new Date();

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    rollNumber: z.string().min(1),
    password: z.string().min(5),
    contact: z.string().min(10).max(10),
    enrollmentDate: z.date(),
    amount: z.number().min(0),
    feeType: z.string(),
    class: z.string(),
  })
  .refine((data) => {});

export function AddStudentForm({ action }) {
  const [isFormVisible, setisFormVisible] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  React.useEffect(() => {
    function handleClickOutside(event) {
      const { target } = event;
      if (isFormVisible && target.classList.contains("modal")) {
        setisFormVisible(false);
      }
    }
    if (isFormVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormVisible]);

  function onSubmit(e) {
    e.preventDefault();
    const formData = form.getValues();
    console.log(formData);
    action(formData); 
  }
  return (
    <div className="rounded-md border">
      <Button variant="" onClick={() => setisFormVisible(!isFormVisible)}>
        Add Student
      </Button>

      {isFormVisible && (
        <div className="fixed inset-0 z-50 p-[20px] flex justify-center items-center bg-black bg-opacity-60 modal">
          <div className="w-5/6 h-5/6 bg-white rounded-lg shadow-xl z-50 overflow-auto">
            <div className="p-6 flex justify-between items-center">
              <Form {...form}>
                <form
                  onSubmit={onSubmit}
                  className=" flex flex-wrap"
                >
                  <div className=" flex flex-wrap">
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="rollNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roll Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter roll number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="class"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Class</FormLabel>
                            <FormControl>
                              <Input placeholder="Class" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter contact number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="feeType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fee Type</FormLabel>
                            <Select
                              name="feeType"
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder="Select the Fee Type"
                                    style={{ color: "rgba(156, 163, 175)" }}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="One Time">
                                  One Time
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fee Amount</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter monthly fee"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-8 w-full md:w-1/2 pr-0 md:pr-4">
                      <FormField
                        control={form.control}
                        name="enrollmentDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-[6px]">
                            <FormLabel className="mt-1">
                              Enrollment Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Enrollment Date</span>
                                    )}
                                    <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  name="enrollmentDate"
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:mt-5 w-full md:w-1/2 pr-0 md:pr-4 flex justify-end">
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
