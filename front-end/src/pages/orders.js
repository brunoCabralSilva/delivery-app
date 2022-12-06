import { useState, useEffect } from 'react';

export default function Orders() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('car-shop'));
    const filteredList = list.filter((item) => item.quant > 0);
    setProducts(filteredList);
  }, []);

  return (
    <div>
      { console.log(products) }
      Orders
    </div>
  );
}
