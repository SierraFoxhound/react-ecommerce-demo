import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';



describe('Header Component', () => {
    let cart;
    let loadCart;
    let user;

    beforeEach(() => {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: "1"
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 3,
            deliveryOptionId: '2'
        }];

        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('Goes to home', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }

        render(
            <MemoryRouter initialEntries={['/orders']}>
                <Header cart={[]} cart={cart} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );

        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

        const clickLogo = screen.getByTestId('header-link');
        await user.click(clickLogo);

        expect(screen.getByTestId('url-path')).toHaveTextContent('/');
    });

    it('displays the header correctly', async () => {
        render(
            <MemoryRouter>
                <Header cart={[]} cart={cart} loadCart={loadCart} />
            </MemoryRouter>
        );

        const logo = screen.getByTestId('header-logo');
        expect(logo).toHaveAttribute('src', 'images/logo-white.png');

        const mobileLogo = screen.getByTestId('header-mobile-logo');
        expect(mobileLogo).toHaveAttribute('src', 'images/mobile-logo-white.png');

        const searchBar = screen.getByTestId('header-search-bar');
        expect(searchBar).toBeInTheDocument();
        expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

        const ordersLink = screen.getByTestId('header-orders-link');
        expect(ordersLink).toBeInTheDocument();
        expect(ordersLink).toHaveAttribute('href', '/orders');

        const cartLink = screen.getByTestId('header-cart-link');
        expect(cartLink).toHaveTextContent('Cart');
        expect(cartLink).toHaveTextContent('5');
        expect(cartLink).toHaveAttribute('href', '/checkout');
    });
});