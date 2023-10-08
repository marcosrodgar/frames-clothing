import { Fragment } from "react";
import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import { Spinner } from "../../spinner/spinner.component";


const CategoriesPreview = () => {
    const categoriesMap  = useSelector(selectCategoriesMap);
    const isLoading  = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {
                isLoading ? <Spinner/> :
                Object.keys(categoriesMap).map(title => (
                    <CategoryPreview key={title} title={title} items={categoriesMap[title]}/>
                ))
            }   
        </Fragment>
        
    )
}

export default CategoriesPreview;