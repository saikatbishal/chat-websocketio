/* eslint-disable react/prop-types */

const UserDetails = ({ details }) => {
    
    return (
        <div className="bg-gray-200 p-2 rounded-lg m-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
                <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">User Details</h5>
                    <p className="mb-2">Username: {details.customerName}</p>
                    <p className="mb-2">Items Ordered:</p>
                    <div className="grid">
                        {details.itemsToOrder.map((item, index) => (
                        <p key={index} className="mb-1 border ">{item}</p>
                    ))}
                    </div>
                    
                    <p className="mb-2">Expected Date of Delivery: {details.deliveryDateTime}</p>
                    <p className="mb-2">Contact Details: {details.mobileContact}</p>
                </div>
            </div>
        </div>
    );
};
/**
 *   customerName: "",
    mobileContact: "",
    itemsToOrder: [""],
    deliveryDateTime: ""
 */


export default UserDetails