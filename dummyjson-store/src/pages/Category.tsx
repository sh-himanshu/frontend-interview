import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContextProvider';

const Category = () => {
  const location = useLocation();
  const { setBreadcrumb } = useGlobalContext();

  const categoryId = location.pathname.split('/').slice(-1)[0];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${categoryId}?limit=8`)
      .then(res => res.json() as unknown as ProductResponse)
      .then(value => {
        setProducts(value.products);
        setBreadcrumb([
          { name: 'home', path: '/' },
          { name: categoryId, path: `/category/${categoryId}` },
        ]);
      });
    return () => {
      setProducts([]);
      setBreadcrumb([]);
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-9 mx-auto">
      {products.map((item, index) => (
        <Link key={index} to={`/product/${item.id}`}>
          <div className="rounded-xl w-[20rem] transition-all  text-black bg-neutral-100 active:bg-neutral-200  active:scale-[102%]  hover:bg-neutral-200 cursor-pointer overflow-hidden flex flex-col">
            <h1 className="m-3 text-base font-medium">
              {item.title.slice(0, 1).toUpperCase() + item.title.toLocaleLowerCase().slice(1)}
            </h1>

            <div>
              <img src={item.thumbnail} className="object-cover h-52 w-full" alt="" />
            </div>

            <div className="p-3">
              <p className="text-xs">{item.description}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t-2 justify-center">
                <span className="font-bold text-lg">Rs. {item.price}</span>

                <span className="bg-red-500 text-sm text-white px-2 scroll-py-0.5 rounded-xl">
                  {item.discountPercentage.toFixed(0)}% off
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
