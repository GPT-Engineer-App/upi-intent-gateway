import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const mockPaymentAPI = async (paymentDetails) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate success or failure response
  if (Math.random() > 0.5) {
    return { status: "success", message: "Payment successful!" };
  } else {
    throw new Error("Payment failed. Please try again.");
  }
};

const Index = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [payerDetails, setPayerDetails] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: mockPaymentAPI,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlePayment = () => {
    const paymentDetails = {
      amount,
      paymentMethod,
      payerDetails,
      upiId,
    };
    mutate(paymentDetails);
  };

  const generateQrCode = () => {
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
          placeholder="Enter Payer Details"
          value={payerDetails}
          onChange={(e) => setPayerDetails(e.target.value)}
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded p-2"
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
        {paymentMethod === "upi" && (
          <Input
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}
        <Button onClick={handlePayment} disabled={isLoading}>
          {isLoading ? "Processing..." : "Make Payment"}
        </Button>
        {paymentMethod === "upi" && (
          <Button onClick={generateQrCode}>Generate QR Code</Button>
        )}
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