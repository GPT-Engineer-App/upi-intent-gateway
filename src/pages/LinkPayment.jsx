import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LinkPayment = () => {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const generatePaymentLink = () => {
    if (amount && upiId) {
      const upiString = `upi://pay?pa=${upiId}&am=${amount}`;
      setPaymentLink(upiString);
    } else {
      alert("Please enter both amount and UPI ID");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Link-Based Payment</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="mb-2"
        />
        <Button onClick={generatePaymentLink}>Generate Payment Link</Button>
      </div>
      {paymentLink && (
        <div className="mt-4">
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            {paymentLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkPayment;