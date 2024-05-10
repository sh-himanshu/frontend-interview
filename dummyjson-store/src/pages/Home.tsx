import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories').then(res =>
      res.json().then(value => setCategories(value))
    );

    return () => {
      setCategories([]);
    };
  }, []);

  return (
    <div className=" grid grid-cols-3 gap-3">
      {categories.map((item, index) => (
        <Link key={index} to={`/category/${item}`}>
          <div className="bg-teal-400 cursor-pointer active:bg-teal-600 h-20 text-center px-3 text-white rounded-lg flex items-center justify-center">
            <span className="select-none font-light text-lg tracking-tight ">
              {item
                .split('-')
                .map(word => {
                  return word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
                })
                .join(' ')}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
