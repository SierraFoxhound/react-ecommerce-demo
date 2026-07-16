import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
//import axios from 'axios';
import { Header } from './Header';


//vi.mock('axios');

describe('Header Component', () => {
    //let loadCart;
    let user;

    beforeEach(() => {
        //loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('Goes to home', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const clickLogo = screen.getByTestId('left-section');
        await user.click(clickLogo);

        expect(screen.getByTestId('url-Path')).toHaveTextContent('/');
    });
});