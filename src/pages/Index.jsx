import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const mockPaymentAPI = async (paymentDetails) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate random success or failure
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
  const mutation = useMutation(mockPaymentAPI, {
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
    };
    mutation.mutate(paymentDetails);
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl">Razorpay Replica Payment Gateway</h1>
      <div className="space-y-2">
        <Input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Enter Payment Method (e.g., card, UPI)"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Input
          placeholder="Enter Payer Details"
          value={payerDetails}
          onChange={(e) => setPayerDetails(e.target.value)}
        />
        <Button onClick={handlePayment} disabled={mutation.isLoading}>
          {mutation.isLoading ? "Processing..." : "Make Payment"}
        </Button>
      </div>
    </div>
  );
};

export default Index;