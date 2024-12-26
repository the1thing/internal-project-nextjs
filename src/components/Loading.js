import React from "react";
const Loading = ({uploadPdf}) => {
  return <div className={`custom-loader ${uploadPdf?'pdf' :''}`}></div>;
};
export default Loading;
