"use client";
import React, { useState, useEffect } from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SingleFeeTable from "./single-fee-table";

export function DataTable({ columns, data, editFee, deleteFee, payFee }) {
  const [sorting, setSorting] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isComponentVisible, setIsComponentVisible] = React.useState(false);
  const componentRef = React.useRef(null);

  
  React.useEffect(() => {
    function handleClickOutside(event) {
      const { target } = event;
      if (isComponentVisible && target.classList.contains("modal")) {
        setIsComponentVisible(false);
      }
    }

    if (isComponentVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isComponentVisible]);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setIsComponentVisible(true);
  };

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
  return (
    <div className="rounded-md border">
      {isComponentVisible && (
        <SingleFeeTable
          componentRef={componentRef}
          selectedRow={selectedRow}
          setIsComponentVisible={setIsComponentVisible}
          data={data}
          deleteFee={deleteFee}
          editFee={editFee}
          payFee={payFee}
        />
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => handleRowClick(data[row.id])}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                
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
    </div>
  );
}
