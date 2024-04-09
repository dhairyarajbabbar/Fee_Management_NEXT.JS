"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Payments() {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Payment</header>
        <Button variant="">Make Payment</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-md">Roll No.</TableHead>
              <TableHead className="w-[120px] text-md">Name</TableHead>
              <TableHead className="text-md ">Payment Date</TableHead>
              <TableHead className="text-md ">Payment for Month</TableHead>
              <TableHead className="text-md ">Method</TableHead>
              <TableHead className="text-md ">Payment Amount</TableHead>
              <TableHead className="text-md ">Edit</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
}
