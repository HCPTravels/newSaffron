import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * @param {Object} props
 * @param {number} props.totalPrice
 * @param {function} props.onClose
 * @param {Object} [props.shippingAddress] - Optional shipping address data to send with payment
 */
const PaymentGateway = ({ totalPrice, onClose, shippingAddress, onRazorpayReady }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  
  // Use ref to prevent multiple executions
  const hasInitialized = useRef(false);
  const isProcessing = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasInitialized.current || isProcessing.current) return;
    
    console.log("totalPrice in PaymentGateway:", totalPrice);
    console.log("userData in PaymentGateway:", user);

    // Validate required data
    if (!totalPrice || !user || !token) {
      console.error("Missing required data for payment");
      return;
    }

    hasInitialized.current = true;
    isProcessing.current = true;

    const loadScript = (src) => {
      return new Promise((resolve) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const loadRazorpay = async () => {
      try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        if (!res) {
          console.error("Razorpay failed to load");
          isProcessing.current = false;
          return;
        }

        const createOrderBody = {
          amount: Number(totalPrice).toFixed(2),
          currency: "INR",
        };

        console.log("Creating order with:", createOrderBody);

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

        console.log("Order created:", orderResponse.data);

        const options = {
          key: "rzp_test_NGI3AugaqSO59N",
          amount: orderResponse.data.amount,
          currency: orderResponse.data.currency,
          order_id: orderResponse.data.id,
          name: "Kisan Saffron",
          description: "Payment for your order",
          handler: async function (response) {
            try {
              const verifyPaymentBody = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                items: cartItems, // <-- send cart items to backend
                shippingAddress, // <-- send shipping address to backend if provided
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
                console.log("Clearing cart now...");

                await axios.delete(`${backendUrl}/api/cart/clear`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                console.log("🧹 Cart clear request sent");
                window.location.href = "/profile/cart";
              } else {
                alert("❌ Payment verification failed. Please try again.");
              }
            } catch (error) {
              console.error("❌ Error during payment verification or cart clear:", error);
              alert("❌ Something went wrong. Try again later.");
            }

            if (onClose) onClose();
          },
          prefill: {
            name: user ? `${user.firstName} ${user.lastName}` : "Guest User",
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
              isProcessing.current = false;
              setRedirecting(true);
              setTimeout(() => {
                navigate("/profile/cart", { replace: true });
              }, 800);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        if (typeof onRazorpayReady === 'function') {
          onRazorpayReady();
        }
        razorpay.open();
        isProcessing.current = false;
      } catch (error) {
        console.error("Error in loadRazorpay:", error);
        isProcessing.current = false;
        if (onClose) onClose();
      }
    };

    loadRazorpay();

    // Cleanup function
    return () => {
      hasInitialized.current = false;
      isProcessing.current = false;
    };
  }, []); // Empty dependency array to run only once

  if (redirecting) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#ff6523] animate-spin" />
        <p className="mt-6 text-lg text-gray-900 font-semibold">Returning to Cart...</p>
      </div>
    );
  }

  return null;
};

export default PaymentGateway;