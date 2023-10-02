import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";
import './shop.styles.scss'

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => (
                    <CategoryPreview key={title} title={title} items={categoriesMap[title]}/>
                ))
            }   
        </Fragment>
        
    )
}

export default Shop;