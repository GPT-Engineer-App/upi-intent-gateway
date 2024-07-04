import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const generateQrCode = () => {
    // Placeholder logic for generating QR code
    const qrCodeData = `upi://pay?pa=${upiId}&am=${amount}`;
    setQrCode(qrCodeData);
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl">Dynamic QR Code Payment</h1>
      <div className="space-y-2">
        <Input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
        <Button onClick={generateQrCode}>Generate QR Code</Button>
      </div>
      {qrCode && (
        <div className="mt-4">
          <img
            src="/placeholder.svg"
            alt="QR Code"
            className="mx-auto object-cover w-full h-[400px]"
          />
          <p>{qrCode}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
