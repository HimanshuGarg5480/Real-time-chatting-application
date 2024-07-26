import React from "react";
import { RxCross1 } from "react-icons/rx";
const Alert = ({ status, message, setAlert}) => {
  return (
    <>
      {status == "error" && (
        <div className="m-10 absolute">
          <div
            className="bg-red-600 border-l-8 border-yellow-500 flex items-center gap-3 p-4"
            role="alert"
          >
            <div>
              <p className="font-bold text-gray-100">Error</p>
              <p className="text-gray-100">{message}</p>
            </div>
            <div className="text-gray-50 hover:text-gray-200 text-lg font-bold" onClick={()=>{
              setAlert(false);
            }}>
              <RxCross1 />
            </div>
          </div>
        </div>
      )}
      {status == "success" && (
        <div className="m-10 absolute">
          <div
            className="bg-green-700 border-l-8 border-yellow-500 p-4"
            role="alert"
          >
            <p className="font-bold text-gray-100">Success</p>
            <p className="text-gray-100">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
