import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode.react";

const StaticQR = () => {
  const [upiId, setUpiId] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = () => {
    if (upiId) {
      const upiString = `upi://pay?pa=${upiId}`;
      setQrCode(upiString);
    } else {
      alert("Please enter UPI ID");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Static QR Code Payment</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="mb-2"
        />
        <Button onClick={generateQRCode}>Generate QR Code</Button>
      </div>
      {qrCode && (
        <div className="mt-4">
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default StaticQR;