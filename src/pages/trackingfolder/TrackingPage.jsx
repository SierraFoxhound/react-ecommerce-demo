import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from '../../components/Header.jsx';
import { Link } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import './TrackingPage.css'

export function TrackingPage({ cart }) {
    const params = useParams();
    console.log(params);

    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);


    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        };

        fetchTrackingData();
    }, [orderId])

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    //Gets the total time required for delivery
    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

    //Calculates the amount of time that has passed since creating the order
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    //const timePassedMs = totalDeliveryTimeMs * 0.3;

    //Gives delivery progress as a percent
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

    //If the delivery percent goes over a 100, then it's still a 100
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }


    //Sorting Delivery Data
    const isPreparing = deliveryPercent < 33;

    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;

    const isDelivered = deliveryPercent === 100;




    return (
        <>
            <link rel="icon" type="images/svg+xml" href="../../../public/tracking-favicon.png" />
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">

                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd')}, {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style=
                            {{
                                width: `${deliveryPercent}%`
                            }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}