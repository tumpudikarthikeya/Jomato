import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Tracking = () => {
  const { orderId: paramOrderId } = useParams(); // Get orderId from URL
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    if (paramOrderId) {
      fetchOrderDetails(paramOrderId);
    }
  }, [paramOrderId]); // Fetch data when URL changes

  const fetchOrderDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`);
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const orderStatuses = ["Delivered", "In Progress", "Cancelled", "Pending"];

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order using the tracking ID provided after purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, UPI, and online wallets.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 30-45 minutes depending on your location.",
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order before it is prepared.",
    },
    {
      question:
        "What should I do if I am not available at the time of delivery?",
      answer:
        "We prefer delivering your order to you in person. However, if you are not available to receive the same, please direct our delivery partner to the alternative person when they call you.",
    },
    // {
    //   question: "What happens if my order is delayed?",
    //   answer:
    //     "We strive to deliver on time, but delays may happen due to traffic or weather conditions. You can track your order in real time.Yes, you can cancel your order before it is prepared.",
    // },
    {
      question: "Is there a way to request special instructions for my order?",
      answer:
        "Yes! You can add special instructions during checkout or call the restaurant directly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex  flex-col md:flex-row justify-center gap-6 ">
      {/* Left Section - Order Tracking */}
      <div className="min-w-2/3 bg-white p-6 rounded-lg shadow-lg">
        {orderData && (
          <div>
            <h2 className="text-2xl font-semibold text-[#ff5200]">
              Order #{orderData.order.order_id}
            </h2>
            <p className="text-gray-600">
              Status:{" "}
              <span className="font-bold text-[#3A7D44]">
                {orderData.order.status}
              </span>
            </p>
            <p className="text-gray-600">
              Payment:{" "}
              <span className="font-bold text-[#3A7D44]">
                {orderData.order.payment_status}
              </span>
            </p>
            <p className="text-gray-600">
              Total:{" "}
              <span className="font-bold">
                ${orderData.order.total_amount.toFixed(2)}
              </span>
            </p>

            {/* Order Status Timeline */}
            <div className="mt-6 border-l-4 border-[#3A7D44] pl-6 space-y-4">
              {orderStatuses.map((status, index) => (
                <div key={index} className="relative flex items-start">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      status === orderData.order.status
                        ? "bg-[#3A7D44]"
                        : "bg-gray-300"
                    }`}
                  />
                  <div className="ml-4">
                    <p
                      className={`font-semibold ${
                        status === orderData.order.status
                          ? "text-[#3A7D44]"
                          : "text-gray-500"
                      }`}
                    >
                      {status}
                    </p>
                    <p className="text-sm text-gray-400">
                      {status === "Delivered"
                        ? "Your order has been delivered."
                        : status === "In Progress"
                        ? "Your order is currently being prepared."
                        : status === "Cancelled"
                        ? "Your order has been cancelled."
                        : "Your order is pending confirmation."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-6 font-semibold text-lg text-[#ff5200]">
              Ordered Items
            </h3>
            <ul className="mt-4 space-y-4">
              {orderData.items.map((item) => (
                <li
                  key={item.order_item_id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.itemDetails.image_url}
                      alt={item.itemDetails.name}
                      className="w-16 h-16 rounded-md"
                    />
                    <div>
                      <p className="font-medium text-lg">
                        {item.itemDetails.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.itemDetails.description}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-lg">
                    x{item.quantity} - ${item.item_price.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section - FAQ */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
        {/* Image Placeholder */}
        <div className="w-full bg-white rounded-lg shadow-lg flex items-center justify-center">
          <img
            src="https://cdn.dribbble.com/userupload/32336038/file/original-4e441127daed13c50f5c8ccd42b6dc32.gif"
            alt="Order"
            className="rounded-md"
          />
        </div>
        <h3 className="text-2xl font-semibold text-[#ff5200] mt-6">FAQs</h3>
        <div className="mt-4 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-2">
              <button
                className="w-full text-left font-medium text-lg text-gray-700"
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                {faq.question}
              </button>
              {faqOpen === index && (
                <p className="mt-2 text-gray-500">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
