import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid'
import './homepage.css';

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //Get product data from backend
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data)
            });

    }, []);


    return (
        <>
            <title>Sage & Stone</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}