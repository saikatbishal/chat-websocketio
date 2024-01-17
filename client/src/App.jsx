import {useState} from 'react'
import ChatWindow from './chatWindow/ChatWindow'
import PopupWindow from './commons/PopupWindow';


const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [mobileContact, setMobileContact] = useState('');
  const [itemsToOrder, setItemsToOrder] = useState(['']);
  const [deliveryDateTime, setDeliveryDateTime] = useState('');
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    
    e.preventDefault();
    // Handle form submission logic here
    // You can access the form values using the state variables (customerName, mobileContact, itemsToOrder, deliveryDateTime)

      // Validate form inputs
      const errors = {};
      if (customerName.trim() === '') {
        errors.customerName = 'Customer Name is required';
      }
      if (mobileContact.trim() === '') {
        errors.mobileContact = 'Mobile Contact is required';
      }
      if (itemsToOrder.trim() === '') {
        errors.itemsToOrder = 'Items to Order is required';
      }
      if (deliveryDateTime.trim() === '') {
        errors.deliveryDateTime = 'Delivery Date/Time is required';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      setIsUserLoggedIn(true);
      // Handle form submission logic here
      // You can access the form values using the state variables (customerName, mobileContact, itemsToOrder, deliveryDateTime)
    };


const handleInputChange = (index, event) => {
  const values = [...itemsToOrder];
  values[index] = event.target.value;
  setItemsToOrder(values);
};

const handleAddFields = () => {
  const values = [...itemsToOrder];
  values.push('');
  setItemsToOrder(values);
};

const handleRemoveFields = (index) => {
  const values = [...itemsToOrder];
  values.splice(index, 1);
  setItemsToOrder(values);
};

    return (
      <div>
        {isUserLoggedIn ? (
          <ChatWindow />
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Customer Name:
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && <span>{errors.customerName}</span>}
            </label>
            <br />
            <label>
              Mobile Contact:
              <input
                type="text"
                value={mobileContact}
                onChange={(e) => setMobileContact(e.target.value)}
              />
              {errors.mobileContact && <span>{errors.mobileContact}</span>}
            </label>
            <br />
            
<label>
  Items to Order:
  {itemsToOrder.map((item, index) => (
    <div key={index}>
      <input
        type="text"
        value={item}
        onChange={(event) => handleInputChange(index, event)}
      />
      {index!==0&&<button type="button" onClick={() => handleRemoveFields(index)}>-</button>}
    </div>
  ))}
  <button type="button" onClick={() => handleAddFields()}>+</button>
  {errors.itemsToOrder && <span>{errors.itemsToOrder}</span>}
</label>
            <br />
            <label>
              Expected Delivery Date/Time:
              <input
                type="text"
                value={deliveryDateTime}
                onChange={(e) => setDeliveryDateTime(e.target.value)}
              />
              {errors.deliveryDateTime && <span>{errors.deliveryDateTime}</span>}
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        )}

        <PopupWindow>Hello World</PopupWindow>
      </div>
    );
  };

  export default App;
