import { Payment, columns } from "./FeeTables/columns";
import { DataTable } from "./FeeTables/data-table";
import { AddFeeButton } from "./addFee/addFee";
const baseUrl = "https://feez-backend-node.vercel.app/v1";
import { cookies } from 'next/headers'

async function getData() {
  const cookieStore = cookies()
  const token = cookieStore.get('accessToken') 
  try {
    const res = await fetch(`${baseUrl}/fee/detail`, {
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
  async function deleteFee(studentId) {
    "use server";
    console.log(studentId);
    // try {
    //   const response = await fetch(`${Url}/student/${studentId}`, {
    //     method: "DELETE",
    //     mode: "cors",
    //   });

    //   if (response.ok) {
    //     console.log(`Student with ID ${studentId} deleted successfully`);
    //   } else {
    //     console.error('Failed to delete student. Status:', response.status);
    //   }
    // } catch (error) {
    //   console.error("Error deleting student:", error);
    // }
  }
  async function payFee(studentId) {
    "use server";
    console.log(studentId);
    // try {
    //   const response = await fetch(`${Url}/student/${studentId}`, {
    //     method: "DELETE",
    //     mode: "cors",
    //   });

    //   if (response.ok) {
    //     console.log(`Student with ID ${studentId} deleted successfully`);
    //   } else {
    //     console.error('Failed to delete student. Status:', response.status);
    //   }
    // } catch (error) {
    //   console.error("Error deleting student:", error);
    // }
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

