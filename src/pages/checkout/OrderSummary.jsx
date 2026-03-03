import dayjs from 'dayjs';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions }) {

    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                //Checks to see if 1 === 2 which means false then checks next 2 === 2 then true!
                //Used to get date when a certain radio is checked on cart = deliveryOptionId
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    });

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption
                                .estimatedDeliveryTimeMs).format('dddd, MMMM D ')}

                        </div>

                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem} />

                            <DeliveryOptions cartItem={cartItem}
                                deliveryOptions={deliveryOptions} />
                        </div>
                    </div>
                );
            })}

        </div>
    );
}