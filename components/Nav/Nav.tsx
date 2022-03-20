import Link from 'next/link';
import { useCategoriesContext } from '../../context/CategoriesContext';
import { Category } from '../../models/Category';
import styles from './Nav.module.css';

const Nav = () => {
  const { categories } = useCategoriesContext();

  function listCategories(categoriesArray: Category[]) {
    return categoriesArray.map((rootCategory) => {
      const children: JSX.Element[] = [];

      categoriesArray.map((childCategory) => {
        if (childCategory.level === 1) {
          const subSubArray = categoriesArray.map((grandChildCategory) => {
            if (grandChildCategory.parentId === childCategory.id) {
              return (
                <li key={grandChildCategory.id}>
                  <Link href={`/list/${grandChildCategory.id}`}>
                    {grandChildCategory.name}
                  </Link>
                </li>
              );
            }
          });

          if (childCategory.parentId === rootCategory.id) {
            children.push(
              <li key={childCategory.id}>
                <Link href={`/list/${childCategory.id}`}>
                  {childCategory.name}
                </Link>
                {subSubArray.length > 0 && <ul>{[...subSubArray]}</ul>}
              </li>,
            );
          }
        }
      });

      if (rootCategory.level === 0)
        return (
          <li key={rootCategory.id}>
            <Link href={`/list/${rootCategory.id}`}>{rootCategory.name}</Link>
            <ul>{[...children]}</ul>
          </li>
        );
    });
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.mainList}>
        <li>
          <Link href="/new/user">New User</Link>
        </li>
        <li>
          <Link href="/new/category">New Category</Link>
        </li>
        {listCategories(categories)}
      </ul>
    </nav>
  );
};

export default Nav;
