import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PaymentSummary } from './PaymentSummary';


describe('PaymentSummary Component', () => {
    let paymentSummary;
    let loadCart;

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

        )

        expect(
            screen.getByText('Estimated tax (10%):')
        ).toBeInTheDocument();

    });
});
