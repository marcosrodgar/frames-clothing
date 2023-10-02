import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { Fragment } from 'react';
import './category.styles.scss'
import ProductCard from '../../product-card/product-card.component';

const Category = () => {
 const {category} = useParams();
 const {categoriesMap} = useContext(CategoriesContext);
 const [products, setProducts] = useState(categoriesMap[category]);

 useEffect(() => {
    setProducts(categoriesMap[category]);
 }, [category, categoriesMap]);

 return(
    <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className="category-container">
        {products &&
            products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
        }
    </div>
    </Fragment>
    
 )

}

export default Category;