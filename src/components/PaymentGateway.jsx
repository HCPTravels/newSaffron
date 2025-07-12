import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PaymentGateway = ({ totalPrice, onClose }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, user } = useAuth();

  useEffect(() => {
    console.log("totalPrice in PaymentGateway:", totalPrice);
    console.log("userData in PaymentGateway:", user);

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const loadRazorpay = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.error(
          "⚠️ Razorpay failed to load. Please check your internet connection.",
          {
            position: "top-center",
            autoClose: 3000,
            style: {
              background: "linear-gradient(to right, #fff3cd, #ffeeba)",
              color: "#856404",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
            icon: "🛑",
          }
        );
        return;
      }

      const createOrderBody = {
        amount: totalPrice.toFixed(2),
        currency: "INR",
      };

      const orderResponse = await axios.post(
        `${backendUrl}/api/payment/create-order`,
        createOrderBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      const options = {
        key: "rzp_test_NGI3AugaqSO59N", // from Razorpay dashboard
        amount: orderResponse.data.amount, // Amount in paise
        currency: orderResponse.data.currency,
        order_id: orderResponse.data.id, // Use the order ID from the response
        name: "Kisan Saffron",
        description: "Payment for your order",
        handler: async function (response) {
          try {
            const verifyPaymentBody = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            console.log("🧾 Sending for verification...", verifyPaymentBody);

            const verifyResponse = await axios.post(
              `${backendUrl}/api/payment/verify-payment`,
              verifyPaymentBody,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                timeout: 10000,
              }
            );

            console.log("🎯 verifyResponse.data:", verifyResponse.data);

            if (verifyResponse.data.success) {
              alert("✅ Payment verified successfully!");

              console.log("Clearing cart now...");

              await axios.delete(`${backendUrl}/api/cart/clear`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              console.log("🧹 Cart clear request sent");

              window.location.href = "/cart";
            } else {
              alert("❌ Payment verification failed. Please try again.");
            }
          } catch (error) {
            console.error(
              "❌ Error during payment verification or cart clear:",
              error
            );
            alert("❌ Something went wrong. Try again later.");
          }

          if (onClose) onClose();
        },
        prefill: {
          name: user ? user.firstName + " " + user.lastName : "Guest User",
          email: user ? user.email : "demo@email.com",
          contact: user ? user.contactNumber : "9999999999",
        },
        theme: {
          color: "#FF6523",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        modal: {
          ondismiss: function () {
            if (onClose) onClose();
          },
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    loadRazorpay();
  }, [totalPrice, onClose]);

  // Do not render anything
  return null;
};

export default PaymentGateway;
