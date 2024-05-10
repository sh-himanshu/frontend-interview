import { FaAngleRight } from 'react-icons/fa6';
import { Link, Route, Routes } from 'react-router-dom';
import storeIcon from './assets/Shopping-Store 1-48.png';
import { useGlobalContext } from './context/GlobalContextProvider';
import Category from './pages/Category';
import Home from './pages/Home';
import Product from './pages/Product';

const App = () => {
  const { breadcrumb } = useGlobalContext();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="bg-neutral-200 h-16 flex justify-between items-center px-12">
        <div className="flex gap-2">
          <img src={storeIcon} className="object-contain h-6 w-6" />
          <h1 className="text-lg ml-2 font-semibold text-neutral-700 uppercase tracking-tighter ">
            Fake JSON Store
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {breadcrumb.map((item, index) => (
            <>
              <Link
                className={index === breadcrumb.length - 1 ? 'pointer-events-none' : ''}
                to={item.path}
              >
                <div className={index === breadcrumb.length - 1 ? 'text-sky-500 font-bold' : ''}>
                  {item.name
                    .split('-')
                    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')}
                </div>
              </Link>
              {index !== breadcrumb.length - 1 && <FaAngleRight />}
            </>
          ))}
        </div>
      </div>
      <div className="flex-1 flex py-8 px-16 justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
