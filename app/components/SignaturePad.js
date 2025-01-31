"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-hot-toast";


const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState(null);
  const [showAddSignature, setShowAddSignature] = useState(false);
  const [yourName, setYourName] = useState("");
  const [preview, setPreview] = useState("");
  const [signatureData, setSignatureData] = useState("");

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL(null);
  };

  const save = () => {
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(signatureData);
    setPreview(signatureData);

    // add signature data to state -- use web apis for data on signing
    let obj = {
      created_at: new Date().toISOString(),
      signature: signatureData,
      name: yourName,
      hash: Math.random().toString(36).substring(7),
    };

    setSignatureData(obj);
    setYourName("");
    setPreview(null);
    toast.success("Signature saved successfully!");
    if (onSave) {
      onSave(signatureData);
    }

    setShowAddSignature(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-md">
      {
        imageURL && (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-bold">Your Signature</h3>
            <img src={imageURL} alt="Your Signature" className="border border-gray-300" />
            <div className="flex flex-col items-center space-y-4">
              <p>{yourName}</p>
              <p className="text-sm text-gray-500">Signed on {new Date().toLocaleString()}</p>
            </div>
          </div>
        )
      }


      {!imageURL && <p className="text-gray-500">No signature added yet</p>}
      <button onClick={() => setShowAddSignature(!showAddSignature)} className={`bg-blue-500 text-white px-4 py-2 rounded ${showAddSignature ? "bg-red-500" : ""}`}>
        {showAddSignature ? "Hide" : "Add"} Signature
      </button>

      {showAddSignature && (
        <>
          <h3 className="text-lg font-bold">Your Name</h3>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            className="border border-gray-500 px-2 py-1 rounded"
          />
          {/* <h3 className="text-lg font-bold">Signature Preview</h3> */}
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
          {preview && (
            <div className="mt-4">
              <h4>Preview:</h4>
              <img src={imageURL} alt="Signature preview" className="border border-gray-300" />
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default SignaturePad;