import { IMG_CDN_URL } from "../Constants";

const FoodItemCard = ({ name, description, imageId, price }) => {
  return (
    <div className="cartSlice">
      <img src={IMG_CDN_URL + imageId} />
      <div>
        <h2>{name}</h2>
        <h3>{description}</h3>
        <h4>Rupees: {price / 100} </h4>
      </div>
    </div>
  );
};

export default FoodItemCard;
