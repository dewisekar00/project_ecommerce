import { useDispatch } from 'react-redux';
import { fetchProductsData } from '../config/redux/Slice/productsSlice';
import SearchingProduct from './SearchingProduct';

const NavMobile = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const categoryName = event.target.value;
    let category = 'category';
    if (categoryName !== '') {
      dispatch(fetchProductsData({ category, categoryName }));
    } else {
      dispatch(fetchProductsData({ category: '', categoryName: '' }));
    }
  };

  return (
    <>

    
  <div className='mx-8 mb-4'>
<SearchingProduct />
  </div>
    <select className="select w-full max-w-xs" onChange={handleChange}>
      <option value="">All category</option>
      <option value="women's clothing">Women Fashion</option>
      <option value="men's clothing">Men Fashion</option>
      <option value="electronics">Electronic</option>
      <option value="jewelery">Jewelery</option>
    </select>
    </>
  );
};

export default NavMobile;

// kalo value ada isinya  maka   dispatch(fetchProductsData({ category, categoryName }));
// tapi kalo value kosong maka  dispatch(fetchProductsData({ " " , " "}))
