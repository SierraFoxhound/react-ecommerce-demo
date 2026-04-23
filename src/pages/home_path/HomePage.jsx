import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './homepage.css';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
        //Get product data from backend
        const getHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        };
        getHomeData();

    }, [search]);


    return (
        <>
            <link rel="icon" type="image/svg+xml" href="../../../public/logomark - green.svg" />
            <title>Sage & Stone</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}