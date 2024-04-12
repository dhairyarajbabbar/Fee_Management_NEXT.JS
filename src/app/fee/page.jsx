import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default function Student() {
  const data = [
    {
      roll_no: 1,
      name: "Rohan",
      enrollment_date: "01/03/2022",
      payment_month: "January",
      due_fee: 1000,
      fee_statuses: [
        {
          payment_id: 2323,
          fee_type: "Registration Fee",
          amount: 500,
          status: "Paid",
          due_date: "01/04/2024",
        },
      ],
    },
    {
      roll_no: 2,
      name: "Rohan",
      enrollment_date: "01/03/2022",
      payment_month: "January",
      due_fee: 2000,
      fee_statuses: [
        {
          payment_id: 2323,
          fee_type: "Registration Fee",
          amount: 500,
          status: "Paid",
          due_date: "01/04/2024",
        },
      ],
    },
    {
      roll_no: 3,
      name: "Rohan",
      enrollment_date: "01/03/2022",
      payment_month: "January",
      due_fee: 1500,
      fee_statuses: [
        {
          payment_id: 2323,
          fee_type: "Registration Fee",
          amount: 500,
          status: "Paid",
          due_date: "01/04/2024",
        },
        {
          payment_id: 7657,
          fee_type: "Registration Fee",
          amount: 1000,
          status: "Paid",
          due_date: "01/04/2024",
        },
      ],
    },
    {
      roll_no: 4,
      name: "Rohan",
      enrollment_date: "01/03/2022",
      payment_month: "January",
      due_fee: 1800,
      fee_statuses: [
        {
          payment_id: 2323,
          fee_type: "Registration Fee",
          amount: 500,
          status: "Paid",
          due_date: "01/04/2024",
        },
      ],
    },
  ];
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Fee</header>
        <Button variant="">Add Fee</Button>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
