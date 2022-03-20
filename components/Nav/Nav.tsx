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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
                    />
                  </svg>
                  <Link href={`/list/${grandChildCategory.id}`}>
                    <a className={styles.item}>{grandChildCategory.name}</a>
                  </Link>
                </li>
              );
            }
          });

          if (childCategory.parentId === rootCategory.id) {
            children.push(
              <li key={childCategory.id}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
                  />
                </svg>
                <Link href={`/list/${childCategory.id}`}>
                  <a className={styles.item}>{childCategory.name}</a>
                </Link>
                {subSubArray.length > 0 && (
                  <ul className={styles.subList}>{[...subSubArray]}</ul>
                )}
              </li>,
            );
          }
        }
      });

      if (rootCategory.level === 0)
        return (
          <li key={rootCategory.id}>
            <Link href={`/list/${rootCategory.id}`}>
              <a className={styles.item}>{rootCategory.name}</a>
            </Link>
            <ul className={styles.subList}>{[...children]}</ul>
          </li>
        );
    });
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.mainList}>
        <li className={styles.item}>
          <Link href="/new/user">New User</Link>
        </li>
        <li className={styles.item}>
          <Link href="/new/category">New Category</Link>
        </li>
        <span className={styles.break} />
        {listCategories(categories)}
      </ul>
    </nav>
  );
};

export default Nav;
