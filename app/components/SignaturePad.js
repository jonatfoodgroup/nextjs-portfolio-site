"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL(null);
  };

  const save = () => {
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(signatureData);
    if (onSave) {
      onSave(signatureData);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-md">
      <h3 className="text-lg font-bold">Sign Here</h3>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 400, height: 200, className: "border border-gray-500" }}
      />
      <div className="flex space-x-4">
        <button onClick={clear} className="bg-gray-500 text-white px-4 py-2 rounded">Clear</button>
        <button onClick={save} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </div>
      {imageURL && (
        <div className="mt-4">
          <h4>Preview:</h4>
          <img src={imageURL} alt="Signature preview" className="border border-gray-300" />
        </div>
      )}
    </div>
  );
};

export default SignaturePad;