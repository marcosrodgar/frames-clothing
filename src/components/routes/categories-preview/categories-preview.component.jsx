import { Fragment } from "react";
import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap  = useSelector(selectCategoriesMap);

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

export default CategoriesPreview;