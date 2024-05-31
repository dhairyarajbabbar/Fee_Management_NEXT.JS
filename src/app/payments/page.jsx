import { columns } from "./columns";
import { DataTable } from "./data-table";
import { MakePaymentForm } from "./make-payment"; 
// const baseUrl="https://feez-backend-node.vercel.app/v1";
async function getData() {
  try {
    const res = await fetch(`${process.env.baseUrl}/payment/details`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
    });
    const jsonData = await res.json();
    // console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const dynamic = 'force-dynamic'
export default async function Payments() {
  const payments = await getData();
  async function formProcessor(formData){
    "use server";
    // console.log(formData);
  }
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Payments</header>
        {/* <MakePaymentForm action={formProcessor} /> */}
      </div>
      <div className="pt-4">
        <DataTable columns={columns} data={payments} />
      </div>
    </div>
  );
}
