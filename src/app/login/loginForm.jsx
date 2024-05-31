"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React from "react";

const formSchema = z
  .object({
    password: z.string().min(5),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
  })
  .refine((data) => {});

export function LoginForm({ action }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    const formData = form.getValues();
    console.log(formData);
    action(formData);
  }

  return (
    <div className="p-0 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full">
          <header className="text-[36px] font-[700]" >Login</header>
            <div className="w-full flex flex-col items-center">
              <div className="mb-8 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-8 w-full">
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
              <div className="mt-5 w-full flex flex-col items-center">
                <Button type="submit" className="mb-4">Submit</Button>
                <Link href="/signup">
                  <div className="text-black hover:underline">Don't have an account? Sign Up</div>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
