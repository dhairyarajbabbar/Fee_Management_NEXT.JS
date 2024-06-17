"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "rollNumber",
    header: "Roll No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment date",
    cell: ({ row }) => {
      const date = new Date(row.original.paymentDate);
      return format(date, "dd-MM-yyyy");
    },
  },
  {
    accessorKey: "paymentForMonth",
    header: "Paymet For Month",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "paymentAmount",
    header: "Payment Amount",
  },
  {
    accessorKey: "name",
    header: "Actions",
  },
];
