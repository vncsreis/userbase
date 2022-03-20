import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCategoriesContext } from '../../context/CategoriesContext';
import { baseUsers } from '../../models/baseUsers';
import { User } from '../../models/User';

const CategoryList = () => {
  const { categories } = useCategoriesContext();
  const router = useRouter();
  const { category: urlId } = router.query;

  const category = categories.find((cat) => cat.id === urlId);

  const children = categories.filter((cat) => cat.parentId === category?.id);

  function renderUsers(usersArray: User[], categoryId: string) {
    return usersArray.map((user) => {
      if (user.category === categoryId) {
        return (
          <li key={user.id}>
            <div>name: {user.name}</div>
            <div>email: {user.email}</div>
            <div>id: {user.id}</div>
          </li>
        );
      }
    });
  }

  return category ? (
    <div>
      {category.parentId !== '0' && (
        <Link href={`/list/${category.parentId}`}>{'<-'}</Link>
      )}
      <h1>
        {category.canHaveUsers() ? 'Can have users' : 'Cannot have users'}
      </h1>
      <div style={{ border: 'solid red 1px' }}>
        <h1>{category.name}</h1>
        {category.canHaveUsers() && renderUsers(baseUsers, category.id)}
      </div>
      {children.length > 0 &&
        children.map((cat) => (
          <div style={{ border: 'solid blue 1px' }} key={cat.id}>
            <Link href={`/list/${cat.id}`}>{cat.name}</Link>
            {category.canHaveUsers() && (
              <ul>
                {renderUsers(baseUsers, cat.id).length > 0 ? (
                  renderUsers(baseUsers, cat.id)
                ) : (
                  <li>No users found on this category</li>
                )}
              </ul>
            )}
          </div>
        ))}
    </div>
  ) : (
    <h1>Category Not Found</h1>
  );
};

export default CategoryList;
