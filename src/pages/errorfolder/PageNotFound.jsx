import { Header } from '../../components/Header';
import './PageNotFound.css'

export function PageNotFound({ cart }) {

    return (
        <>

            <title>404 Page Not Found</title>

            <Header cart={cart} />

            <div className="page-not-found">
                <h1>404 (Not Found)</h1>
            </div>
        </>
    )
}