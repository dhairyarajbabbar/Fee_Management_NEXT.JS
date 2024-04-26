import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { AddStudentForm } from "./add_student";
async function getData() {
  try {
    const res = await fetch(`http://localhost:5000/v1/student/withdue`, {
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

export default async function Student() {
  const students = await getData();
  async function formProcessor(formdata){
    "use server";
    const response = await fetch(`http://localhost:5000/v1/student/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formdata),

      mode: "cors",
    });
    console.log(formdata);
    if (response.ok) {
      const result = await response.json();
      console.log('Response data:', result);
      formdata.studentId = result.id;

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
        console.log('Fee creation response:', feeResult);
      } else {
        console.error('Failed to create fee. Status:', feeResponse.status);
      }
    } else {
      console.error('Failed to create student. Status:', response.status);
    }
  }
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Students</header>
        <AddStudentForm action={formProcessor} />
      </div>
      <div className="pt-4">
        <DataTable columns={columns} data={students} />
      </div>
    </div>
  );
}
