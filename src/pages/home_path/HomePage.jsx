import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid'
import './homepage.css';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //Get product data from backend
        const getHomeData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        };
        getHomeData();

    }, []);


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