"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns = [
  {
    accessorKey: "roll_no",
    header: "Roll No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "payment_date",
    header: "Payment date",
  },
  {
    accessorKey: "payment_month",
    header: "Paymet For Month",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "amount",
    header: "Payment Amount",
  },
  {
    accessorKey: "name",
    header: "Actions",
  },
]
