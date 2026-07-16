import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary Component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 1,
            "productCostCents": 2067,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 2067,
            "taxCents": 207,
            "totalCostCents": 2274
        };

        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('displays the payment summary correct', async () => {
        render(
            <MemoryRouter >
                <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Items (1):')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
                .getByText('$20.67')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Shipping & handling:')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-shipping-cost'))
                .getByText('$0.00')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Total before tax:')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-total-before-tax'))
                .getByText('$20.67')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Estimated tax (10%):')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-tax'))
                .getByText('$2.07')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Order total:')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-total'))
                .getByText('$22.74')
        ).toBeInTheDocument();

    });

    it('places an order', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }



        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );

        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);


        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    });
});
