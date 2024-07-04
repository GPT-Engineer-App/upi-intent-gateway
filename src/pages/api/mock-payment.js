export default function handler(req, res) {
  if (req.method === "POST") {
    const { amount, paymentMethod, payerDetails } = req.body;

    // Simulate payment processing delay
    setTimeout(() => {
      if (Math.random() > 0.2) {
        res.status(200).json({ status: "success", amount, paymentMethod, payerDetails });
      } else {
        res.status(500).json({ status: "failure", message: "Payment failed" });
      }
    }, 1000);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}