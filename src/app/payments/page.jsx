import { Button } from "@/components/ui/button";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
export default function Payments() {
  const data = [
    {
      roll_no: 1,
      name:"Rohan",
      payment_date: "01/03/2022",
      payment_month: "January",
      method: "Cash",
      amount: 100
    },
  ];
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Payment</header>
        <Button variant="">Make Payment</Button>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
