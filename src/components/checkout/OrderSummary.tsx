

function OrderSummary({ cart, address, paymentMethod, totalPrice }) {


  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
              <p>
                <strong>Building Name: {address.building}</strong>
              </p>
              <p>
                <strong>Street Name: {address.street}</strong>
              </p>
              <p>
                <strong>City Name: {address.city}</strong>
              </p>
            </div>

            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
              <p>
                <strong>Method: {paymentMethod}</strong>
              </p>
            </div>

            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
              <div className="space-y-2">
                {cart?.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                        item?.item?.image
                      }`}
                      alt=""
                      className="w-12 h-12 rounded"
                    />

                    <div className="text-gray-500 ">
                      <p>{item?.item?.productName}</p>
                      <p>Ksh {item?.item?.specialPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>Ksh {totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>Ksh. 0</span>
              </div>
              <div className="flex justify-between">
                <span>SubTotal</span>
                <span>Ksh {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
