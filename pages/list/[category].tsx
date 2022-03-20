import Link from 'next/link';
import { useRouter } from 'next/router';
import { title } from 'process';
import UsersTable from '../../components/UsersTable';
import { useCategoriesContext } from '../../context/CategoriesContext';
import { useUsersContext } from '../../context/UsersContext';
import { baseUsers } from '../../models/baseUsers';
import { User } from '../../models/User';
import styles from './Category.module.css';

const CategoryList = () => {
  const { categories } = useCategoriesContext();
  const router = useRouter();
  const { category: urlId } = router.query;
  const { users } = useUsersContext();

  const category = categories.find((cat) => cat.id === urlId);

  const children = categories.filter((cat) => cat.parentId === category?.id);

  function renderUsers(usersArray: User[], categoryId: string) {
    const usersOfCategory = usersArray.filter(
      (user) => user.category === categoryId,
    );

    if (usersOfCategory.length > 0) {
      return <UsersTable users={usersOfCategory} />;
    }
  }
  return category ? (
    <div className={styles.page}>
      {category.parentId !== '0' ? (
        <Link passHref href={`/list/${category.parentId}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={styles.navArrow}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </Link>
      ) : (
        <div style={{ height: '30px', width: '30px' }}></div>
      )}
      <div className={styles.content}>
        <h1 className={title}>{category.name}</h1>
        {category.canHaveUsers() && renderUsers(users, category.id)}
      </div>
      <div className={styles.linkList}>
        {children.length > 0 &&
          children.map((cat) => (
            <div className={styles.link} key={cat.id}>
              <Link href={`/list/${cat.id}`}>{cat.name}</Link>
              {category.canHaveUsers() && (
                <ul>
                  {users.length > 0 ? (
                    renderUsers(baseUsers, cat.id)
                  ) : (
                    <li>No users found on this category</li>
                  )}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  ) : (
    <h1>Category Not Found</h1>
  );
};

export default CategoryList;
