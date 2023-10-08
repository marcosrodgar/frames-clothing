import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import './category.styles.scss'
import ProductCard from '../../product-card/product-card.component';
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import { Spinner } from '../../spinner/spinner.component';

const Category = () => {
 const {category} = useParams();
 const categoriesMap  = useSelector(selectCategoriesMap);
 const isLoading = useSelector(selectCategoriesIsLoading);
 const [products, setProducts] = useState(categoriesMap[category]);


 useEffect(() => {
    setProducts(categoriesMap[category]);
 }, [category, categoriesMap]);

 return(
    <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        {
            isLoading ? <Spinner/> :
            <div className="category-container">
                {products &&
                    products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
                }
             </div>
        }     
    </Fragment>
    
 )

}

export default Category;