import CategoriesContext from './CategoriesContext';
import UsersContext from './UsersContext';

interface ContextProps {
  children: JSX.Element | JSX.Element[];
}

const Context = ({ children }: ContextProps) => {
  return (
    <UsersContext>
      <CategoriesContext>{children}</CategoriesContext>
    </UsersContext>
  );
};

export default Context;
