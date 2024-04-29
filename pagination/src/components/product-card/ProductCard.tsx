import { FaStar } from 'react-icons/fa6';
import { Product } from '../../lib/types';
import styles from './ProductCard.module.css';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={product.thumbnail} alt={product.title} />
        <div>
          <FaStar />
          <span>{product.rating}</span>
        </div>
      </div>
      <h3 className={styles.card__title}>{product.title}</h3>
      <p className={styles.card__info}>{product.description}</p>
    </div>
  );
};

export default ProductCard;
