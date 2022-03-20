import { createContext, useContext, useState } from 'react';
import { baseCategories } from '../models/baseCategories';
import { Category } from '../models/Category';

interface CategoriesContext {
  categories: Category[];
  setCategories: (list: Category[]) => void;
}

const initContext: CategoriesContext = {
  categories: [],
  setCategories: (list) => {},
};

const Categories = createContext<CategoriesContext>(initContext);

const CategoriesContext = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [categories, setCategories] = useState<Category[]>(baseCategories);

  return (
    <Categories.Provider value={{ categories, setCategories }}>
      {children}
    </Categories.Provider>
  );
};

export default CategoriesContext;

export const useCategoriesContext = () => {
  return useContext(Categories);
};
