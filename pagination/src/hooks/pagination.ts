import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import { Product } from '../lib/types';

export const usePagination = (itemPerPage: number = 8) => {
  const [productTotal, setProductTotal] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(0);

  const nextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, endPage));
  };

  const prevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handlePageClick = (page: number) => setCurrentPage(page);

  useEffect(() => {
    setIsLoading(true);
    getProducts(999).then(resp => {
      setProductTotal(resp?.products);
      setIsLoading(false);
      if (productTotal) setEndPage(Math.ceil(productTotal?.length / itemPerPage));
    });

    return () => {
      // setProductTotal(undefined);
      // setIsLoading(false);
    };
  }, []);

  return {
    isLoading,
    currentPage,
    pages: [...new Array(endPage)].map((_, index) => index + 1),
    products: productTotal?.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage),
    nextPage,
    prevPage,
    endPage,
    handlePageClick,
  };
};
