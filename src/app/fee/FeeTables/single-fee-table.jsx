"use client";
import { SingleDataTable } from "./SingleFeeDataTable";
import { single_table_columns } from "./columns";

export default function SingleFeeTable(props) {
  return (
    <div
      ref={props.componentRef}
      className="fixed inset-0 z-50 p-[20px] flex justify-center items-center bg-black bg-opacity-60 modal"
    >
      <div className="w-4/5 h-3/4 bg-white rounded-lg shadow-xl z-50 overflow-auto">
        <div className="pl-2 pr-2 flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            Fee Details for {props.selectedRow?.name} {props.selectedRow.payment_month}
          </h3>
          <button
            className="text-[30px] font-semibold "
            onClick={() => props.setIsComponentVisible(false)}
          >
            &times;
          </button>
        </div>
        <SingleDataTable columns={single_table_columns} data={props.selectedRow.feeDetails} editFee={props.editFee} deleteFee={props.deleteFee} payFee={props.payFee}/>
      </div>
    </div>
  );
}
