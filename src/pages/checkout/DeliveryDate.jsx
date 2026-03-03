import dayjs from 'dayjs';

export function DeliveryDate({ cartItem, deliveryOptions }) {

    //Checks to see if 1 === 2 which means false then checks next 2 === 2 then true!
    //Used to get date when a certain radio is checked on cart = deliveryOptionId
    const selectedDeliveryOption = deliveryOptions
        .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
        });

    return (
        <div className="delivery-date">
            Delivery date: {dayjs(selectedDeliveryOption
                .estimatedDeliveryTimeMs).format('dddd, MMMM D ')}

        </div>
    );
}