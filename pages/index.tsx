import Router from 'next/router';
import { useEffect } from 'react';
import { useCategoriesContext } from '../context/CategoriesContext';

const Index = () => {
  const { categories } = useCategoriesContext();

  useEffect(() => {
    if (categories.length > 0) {
      Router.push(`/list/${categories[0].id}`);
    } else {
      Router.push('/new/category');
    }
  }, []);

  return <div />;
};

export default Index;
