"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "roll_no",
    header: "Roll No",
  },
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "PaymentDate",
    header: "Payment date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("PaymentDate"));
      const formatted = date.toLocaleDateString('en-US')

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "payment_month",
    header: "Paymet For Month",
  },
  {
    accessorKey: "Method",
    header: "Method",
  },
  {
    accessorKey: "Amount",
    header: "Payment Amount",
  },
  {
    accessorKey: "name",
    header: "Actions",
  },
];
