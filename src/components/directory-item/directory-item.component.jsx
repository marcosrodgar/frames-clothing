import {DirectoryItemContainer, Body, BackgroundImage} from './directory-item.styles.jsx'
import { useNavigate } from 'react-router-dom';


function DirectoryItem({ category }) {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => {
    navigate(route);
  } 
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageurl={imageUrl} />
            <Body>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer> 
    )

}

export default DirectoryItem;