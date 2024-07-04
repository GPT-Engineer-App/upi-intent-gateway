import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const mockPaymentAPI = async (paymentDetails) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ status: "success" });
      } else {
        reject({ status: "failure" });
      }
    }, 1000);
  });
};

const Index = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [payerDetails, setPayerDetails] = useState("");
  const mutation = useMutation({
    mutationFn: mockPaymentAPI,
    onSuccess: (data) => {
      toast.success("Payment Successful!");
    },
    onError: (error) => {
      toast.error("Payment Failed!");
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
