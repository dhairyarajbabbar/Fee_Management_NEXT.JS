import { columnConfig } from "./columns";
import { DataTable } from "./data-table";
import { AddStudentForm } from "./add_student";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  try {
    const res = await fetch(`${process.env.baseUrl}/student/withdue`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      mode: "cors",
      credentials: "include",
      credentials: "same-origin",
    });
    const jsonData = await res.json();
    // console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    // throw error;
  }
}
export default async function Student() {
  const students = await getData();
  async function addStudentFormProcessor(formdata) {
    "use server";
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
    const response = await fetch(`${baseUrl}/student/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(formdata),

      mode: "cors",
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Response data:", result);
      formdata.studentId = result.id;

      const feeResponse = await fetch(`${baseUrl}/fee/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
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
    } else {
      console.error("Failed to create student. Status:", response.status);
    }
  }
  async function editStudent(studentId) {
    "use server";
    console.log(studentId);
  }
  async function deleteStudent(studentId) {
    "use server";
    console.log(studentId);
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
    try {
      const response = await fetch(`${Url}/student/${studentId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log(`Student with ID ${studentId} deleted successfully`);
      } else {
        console.error("Failed to delete student. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <header className="text-[36px] font-[700]">Students</header>
        <AddStudentForm action={addStudentFormProcessor} />
      </div>
      <div className="pt-4">
        <DataTable
          columns={columnConfig}
          data={students}
          editStudent={editStudent}
          deleteStudent={deleteStudent}
        />
      </div>
    </div>
  );
}
