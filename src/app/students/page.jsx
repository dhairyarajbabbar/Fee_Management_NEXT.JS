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
import StudentsClient from "@/app/students/users";
import Link from "next/link";
import { AddStudentForm } from "./add_student";
// import router from "next/navigation";
export default function Student() {
  const students = [
    {
      name: "Rohan",
      roll_no: 1,
      class: "5th",
      contact: "9211650429",
      due_fee: 5000,
    },
    {
      name: "Sara",
      roll_no: 2,
      class: "6th",
      contact: "9876543210",
      due_fee: 3000,
    },
    {
      name: "John",
      roll_no: 3,
      class: "7th",
      contact: "1234567890",
      due_fee: 2000,
    },
    {
      name: "Emily",
      roll_no: 4,
      class: "8th",
      contact: "9876543210",
      due_fee: 1000,
    },
    {
      name: "Michael",
      roll_no: 5,
      class: "9th",
      contact: "9876543210",
      due_fee: 2500,
    },
    {
      name: "Sophia",
      roll_no: 6,
      class: "10th",
      contact: "9876543210",
      due_fee: 4000,
    },
    {
      name: "Ethan",
      roll_no: 7,
      class: "11th",
      contact: "9876543210",
      due_fee: 1500,
    },
    {
      name: "Olivia",
      roll_no: 8,
      class: "12th",
      contact: "9876543210",
      due_fee: 3500,
    },
    {
      name: "James",
      roll_no: 9,
      class: "5th",
      contact: "9876543210",
      due_fee: 2800,
    },
    {
      name: "Ava",
      roll_no: 10,
      class: "6th",
      contact: "9876543210",
      due_fee: 2000,
    },
    {
      name: "Noah",
      roll_no: 11,
      class: "7th",
      contact: "9876543210",
      due_fee: 3200,
    },
  ];
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Students</header>
        <AddStudentForm/>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-md">Roll No.</TableHead>
              <TableHead className="text-md">Name</TableHead>
              <TableHead className="text-md">Class</TableHead>
              <TableHead className="text-md">Contact</TableHead>
              <TableHead className="text-md">Due Fee</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <StudentsClient students={students} />
      </div>
    </div>
  );
}
