import "./ProductItem.css";
import addCartButton from "./../assets/img/add-to-cart-button.png";
import { IProductItem } from "../../redux/productSlice";
import { getNameCateFromId, ICategoryItem } from "../../redux/categorySlice";
import { Rate } from "antd";
import { Link } from "react-router-dom";

interface Props {
  data: IProductItem;
  categories: ICategoryItem[];
}

const ProductItem = ({ data, categories }: Props) => {
  return (
    <div className="col-4 pb-4 product__item__col">
      <div className="product__card">
        <div className="product__img">
          <Link to={`/${data.slug}.${data._id}`}>
            <img src={data.thumbnail_cdn} alt={data.slug} />
          </Link>
        </div>
        <div className="product__body">
          <div className="d-flex align-items-center justify-content-between product__name__price">
            <div className="product__name">
              <Link to={`/${data.slug}.${data._id}`}>
                <h3 className="name">{data.name}</h3>
              </Link>
              <span className="info">
                {getNameCateFromId(categories, data.category_id)}
              </span>
            </div>
            <div className="product__price">
              <h4 className="price">${data.price}</h4>
            </div>
          </div>
          <div className="d-flex justify-content-between product__rating__buy">
            <div className="product__rating">
              <Rate value={+data.rating} disabled />
            </div>
            <div className="product__buy">
              <a>
                <img src={addCartButton} alt="image" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
