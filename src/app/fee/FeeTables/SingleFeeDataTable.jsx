"use client";
import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteFeeForm } from "../actionOptions/deleteFee";
import { MarkAsPaid } from "../actionOptions/markAsPaid";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SingleDataTable({ columns, data, editFee, deleteFee, payFee }) {
  const [sorting, setSorting] = React.useState([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [feeIdToDelete, setFeeIdToDelete] = useState(null);
  const [feeIdToPay, setFeeIdToPay] = useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    function handleClickOutside(event) {
      const { target } = event;
      if (showDeleteForm && target.classList.contains("modal")) {
        setShowDeleteForm(false);
      }
    }

    if (showDeleteForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteForm]);

  const handleDeleteClick = (feeId) => {
    setFeeIdToDelete(feeId);
    setShowDeleteForm(true);
  };

  const handlePayFeeClick = (feeId) => {
    setFeeIdToPay(feeId);
    setShowPaymentConfirmation(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => editFee(row.original._id)}>
                        Edit Fee
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(row.original.feeId)}>
                        Delete Fee
                      </DropdownMenuItem>
                      {(row.original.status === "unpaid" || row.original.status === "upcoming") && (
                        <DropdownMenuItem onClick={() => handlePayFeeClick(row.original.feeId)}>
                          Mark as Paid
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showDeleteForm && (
        <div className="fixed inset-0 z-50 p-[20px] flex justify-center items-center bg-black bg-opacity-60 modal">
          <DeleteFeeForm deleteFee={deleteFee} _id={feeIdToDelete} />
        </div>
      )}
      {showPaymentConfirmation && (
        <div className="fixed inset-0 z-50 p-[20px] flex justify-center items-center bg-black bg-opacity-60 modal">
          <MarkAsPaid payFee={payFee} _id={feeIdToPay} />
        </div>
      )}
    </div>
  );
}
