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

export default function Student() {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Fee</header>
        <Button variant="">Add Fee</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-md">Roll No.</TableHead>
              <TableHead className="text-md">Name</TableHead>
              <TableHead className="text-md ">Fee Details</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
}
