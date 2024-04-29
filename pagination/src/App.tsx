import './App.css';
import Pagination from './components/pagination/Pagination';
import ProductCard from './components/product-card/ProductCard';
import { FaHourglassHalf } from 'react-icons/fa6';
import { usePagination } from './hooks/pagination';

const App = () => {
  const { products, isLoading, nextPage, prevPage, pages, currentPage, handlePageClick, endPage } =
    usePagination();

  return (
    <div className="container">
      {isLoading && (
        <div className="loading">
          <FaHourglassHalf />
          <span>Loading...</span>
        </div>
      )}

      {!isLoading &&
        (typeof products === 'undefined' ? (
          <div className="loading"></div>
        ) : (
          <div className="card-container">
            {products.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        ))}

      <Pagination
        endPage={endPage}
        currentPage={currentPage}
        pages={pages}
        onNext={nextPage}
        onPrev={prevPage}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default App;
