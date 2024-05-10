import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContextProvider';
import { cn } from '../lib/utils';

const Product = () => {
  const location = useLocation();
  const { setBreadcrumb } = useGlobalContext();
  const productId = location.pathname.split('/').slice(-1)[0];

  const [product, setProduct] = useState<Product>();

  const [imageInFocus, setImageInFocus] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json() as unknown as Product)
      .then(value => {
        setProduct(value);

        setBreadcrumb([
          { name: 'home', path: '/' },
          { name: value.category, path: `/category/${value.category}` },
          {
            name: value.title,
            path: `/product/${productId}`,
          },
        ]);
      });
    return () => {
      setProduct(undefined);
    };
  }, []);

  if (!product) return <span>Loading...</span>;

  return (
    <div className="flex w-full">
      <div className="basis-7/12 flex items-center justify-start ">
        <div className="grid grid-cols-1 p-3 gap-3 h-[35rem] bg-neutral-200 rounded-xl overflow-y-scroll">
          {product.images.map((item, index) => (
            <div
              key={index}
              onClick={() => setImageInFocus(index)}
              className={cn('cursor-pointer p-1 rounded-xl', {
                'bg-sky-500': imageInFocus === index,
              })}
            >
              <img src={item} alt="" className="h-40 w-40 object-cover rounded-lg" />
            </div>
          ))}
        </div>
        <div className="px-8">
          <div className="">
            <img
              src={product.images[imageInFocus]}
              className="object-contain h-[30rem] w-full "
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="  flex items-center text-center justify-center flex-col px-6">
        <h2 className="text-5xl  font-bold">
          {product.title
            .split(' ')
            .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLocaleLowerCase())
            .join(' ')}
        </h2>
        <p className="mt-8 text-base font-light">{product.description}</p>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t-2 justify-center">
          <span className="font-bold text-lg">Rs. {product.price}</span>

          <span className="bg-red-500 text-sm text-white px-2 rounded-xl">
            {product.discountPercentage.toFixed(0)}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
