import { Payment, columns } from "./FeeTables/columns";
import { DataTable } from "./FeeTables/data-table";
import { AddFeeButton } from "./addFee/addFee";
// const baseUrl = "https://feez-backend-node.vercel.app/v1";
// const baseUrl = "https://feez-backend-node.vercel.app/v1";
import { cookies } from 'next/headers'

async function getData() {
  const cookieStore = cookies()
  const token = cookieStore.get('accessToken') 
  try {
    const res = await fetch(`${process.env.baseUrl}/fee/detail`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`, 
      },
      mode: "cors",
      credentials: "include", 
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
async function getStudents() {
  const cookieStore = cookies()
  const token = cookieStore.get('accessToken') 
  try {
    const res = await fetch(`${process.env.baseUrl}/student/id`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`, 
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
  // console.log(students);
  async function feeFormProcessor(formdata) {
    "use server";
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken') 
    console.log(formdata);
    const feeResponse = await fetch(`${baseUrl}/fee/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`, 
      },
      body: JSON.stringify(formdata),
      mode: "cors",
      credentials: "include", 
    });
    if (feeResponse.ok) {
      const feeResult = await feeResponse.json();
      console.log("Fee creation response:", feeResult);
    } else {
      console.error("Failed to create fee. Status:", feeResponse.status);
    }
  }
  async function editFee(studentId) {
    "use server";
    console.log(studentId);
  }
  async function deleteFee(feeId) {
    "use server";
    console.log(feeId);
    try {
      const response = await fetch(`${process.env.baseUrl}/fee/${feeId}`, {
        method: "DELETE",
        mode: "cors",
      });
      if (response.ok) {
        console.log(`fee with ID ${feeId} deleted successfully`);
      } else {
        console.error('Failed to delete fee :', response.status);
      }
    } catch (error) {
      console.error("Error deleting fee:", error);
    }
  }
  async function payFee(feeId) {
    "use server";
    console.log(feeId);
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken')
    try {
      const response = await fetch(`${process.env.baseUrl}/payment/cash/${feeId}`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log(`Fee with ID ${feeId} deleted successfully`);
      } else {
        console.error('Failed to delete student. Status:', response.status);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Fee</header>
        <AddFeeButton action={feeFormProcessor} data={students}/>
      </div>
      <div className="pt-4">
        <DataTable columns={columns} data={data} editFee={editFee} deleteFee={deleteFee} payFee={payFee}/>
      </div>
    </div>
  );
}

