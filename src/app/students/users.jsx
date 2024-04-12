"use client";
// import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StudentsClient({ students }) {
  const router = useRouter();
  const pathname = usePathname()
  return (
    <Table>
      <TableBody>
        {students.map((student, key) => (
          <TableRow
            onClick={() => {
              router.push(`${pathname}/${student.roll_no}`);
            }}
            key={student.roll_no}
          >
            <TableCell className="font-medium">{student.roll_no}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.contact}</TableCell>
            <TableCell>{student.due_fee}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
