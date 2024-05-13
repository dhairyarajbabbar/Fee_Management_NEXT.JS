"use client"
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { DeleteStudentForm } from "./deleteStudent";

export function DataTable({ columns, data, editStudent, deleteStudent }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [studentNameToDelete, setStudentNameToDelete] = useState("");

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

  const handleDeleteClick = (studentId, studentName) => {
    setStudentIdToDelete(studentId);
    setStudentNameToDelete(studentName);
    setShowDeleteForm(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
              <TableHead>Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(student.rollNumber)}>Copy Roll Number</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => editStudent(row.original._id)}>Edit Student</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(row.original._id, row.original.name)}>Delete Student</DropdownMenuItem>
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
          <DeleteStudentForm
            studentName={studentNameToDelete}
            deleteStudent={deleteStudent}
            _id={studentIdToDelete}
          />
        </div>
      )}
    </div>
  );
}
