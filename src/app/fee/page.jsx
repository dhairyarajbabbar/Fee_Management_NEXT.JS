import { Payment, columns } from "./FeeTables/columns";
import { DataTable } from "./FeeTables/data-table";
import { AddFeeButton } from "./addFee/addFee";
const baseUrl = "http://localhost:5000/v1";
async function getData() {
  try {
    const res = await fetch(`${baseUrl}/fee/detail`, {
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
async function getStudents() {
  try {
    const res = await fetch(`${baseUrl}/student/id`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function Fee() {
  const data = await getData();
  const students = await getStudents();
  async function formProcessor(formdata) {
    "use server";
    console.log(formdata);
    const feeResponse = await fetch(`http://localhost:5000/v1/fee/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formdata),
      mode: "cors",
    });
    if (feeResponse.ok) {
      const feeResult = await feeResponse.json();
      console.log("Fee creation response:", feeResult);
    } else {
      console.error("Failed to create fee. Status:", feeResponse.status);
    }
  }
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Fee</header>
        <AddFeeButton action={formProcessor} data={students}/>
      </div>
      <div className="pt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

