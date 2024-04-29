import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Pagination.module.css';
import cn from 'clsx';

type Props = {
  pages: number[];
  currentPage: number;
  endPage: number;
  onNext: () => void;
  onPrev: () => void;
  onPageClick: (page: number) => void;
};

const Pagination = ({ pages, onNext, onPrev, currentPage, onPageClick, endPage }: Props) => {
  return (
    <div className={styles['pagination']}>
      <button
        onClick={onPrev}
        className={cn(styles.pagination__button, styles['pagination__button-left'], {
          [styles['pagination__button-disabled']]: currentPage === 1,
        })}
      >
        <IoIosArrowBack />
        <span>Prev</span>
      </button>

      {pages.map(item => (
        <button
          onClick={() => onPageClick(item)}
          key={item}
          className={cn(styles.pagination__button, {
            [styles['pagination__button-current']]: item === currentPage,
          })}
        >
          {item}
        </button>
      ))}

      <button
        onClick={onNext}
        className={cn(styles.pagination__button, styles['pagination__button-right'], {
          [styles['pagination__button-disabled']]: currentPage === endPage,
        })}
      >
        <span>Next</span>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
