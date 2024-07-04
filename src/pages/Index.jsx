import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Index = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [payerDetails, setPayerDetails] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const { mutate: processPayment, isLoading } = useMutation({
    mutationFn: async (paymentData) => {
      // Simulate payment processing with a mock API
      const response = await fetch("/api/mock-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Payment successful!");
      console.log("Payment successful:", data);
    },
    onError: (error) => {
      toast.error("Payment failed. Please try again.");
      console.error("Payment failed:", error);
    },
  });

  const handlePayment = () => {
    const paymentData = {
      amount,
      paymentMethod,
      payerDetails,
    };
    processPayment(paymentData);
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
          placeholder="Enter Name"
          value={payerDetails.name}
          onChange={(e) => setPayerDetails({ ...payerDetails, name: e.target.value })}
        />
        <Input
          placeholder="Enter Email"
          value={payerDetails.email}
          onChange={(e) => setPayerDetails({ ...payerDetails, email: e.target.value })}
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
        <Button onClick={handlePayment} disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default Index;