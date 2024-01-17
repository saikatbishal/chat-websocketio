import { useState } from "react";
import ChatWindow from "./chatWindow/ChatWindow";
import "./App.css";
const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState("new user");
  const [mobileContact, setMobileContact] = useState("99999");
  const [itemsToOrder, setItemsToOrder] = useState(["One", "Two"]);
  const [deliveryDateTime, setDeliveryDateTime] = useState("");
  const [errors, setErrors] = useState({});
  const [userDetails, setUserDetails] = useState({
    customerName: "",
    mobileContact: "",
    itemsToOrder: [""],
    deliveryDateTime: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (customerName.trim() === "") {
      errors.customerName = "Customer Name is required";
    }
    if (mobileContact.trim() === "") {
      errors.mobileContact = "Mobile Contact is required";
    }
    if (itemsToOrder.join(", ").trim() === "") {
      errors.itemsToOrder = "Items to Order is required";
    }
    if (deliveryDateTime.trim() === "") {
      errors.deliveryDateTime = "Delivery Date/Time is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setIsUserLoggedIn(true);
    setUserDetails({customerName, mobileContact, itemsToOrder, deliveryDateTime})
  };

  const handleInputChange = (index, event) => {
    const values = [...itemsToOrder];
    values[index] = event.target.value;
    setItemsToOrder(values);
  };

  const handleAddFields = () => {
    const values = [...itemsToOrder];
    values.push("");
    setItemsToOrder(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...itemsToOrder];
    values.splice(index, 1);
    setItemsToOrder(values);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      {isUserLoggedIn && (
        <div className="absolute left-64 border-black border rounded-2xl">
          <ChatWindow userDetails={userDetails} hidden = {!isUserLoggedIn} setHidden = {()=>setIsUserLoggedIn}/>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Customer Name:
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.customerName && (
            <span className="text-red-500 text-sm">{errors.customerName}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Mobile Contact:
          </label>
          <input
            type="number"
            value={mobileContact}
            onChange={(e) => setMobileContact(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.mobileContact && (
            <span className="text-red-500 text-sm">{errors.mobileContact}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Items to Order:
          </label>
          <div className="grid gap-2">
            {itemsToOrder.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="text"
                  value={item}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-40 px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  className="px-2 py-1 text-sm text-white bg-green-500 rounded-md"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
                {index !== 0 && (
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-white bg-red-500 rounded-md"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {errors.itemsToOrder && (
              <span className="text-red-500 text-sm">{errors.itemsToOrder}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Expected Delivery Date/Time:
          </label>
          <input
            type="date"
            value={deliveryDateTime}
            onChange={(e) => setDeliveryDateTime(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.deliveryDateTime && (
            <span className="text-red-500 text-sm">{errors.deliveryDateTime}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
