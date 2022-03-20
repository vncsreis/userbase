import { useState } from 'react';
import { useCategoriesContext } from '../../../context/CategoriesContext';
import { useUsersContext } from '../../../context/UsersContext';
import { User } from '../../../models/User';
import styles from './NewUser.module.css';

const NewUser = () => {
  const { categories } = useCategoriesContext();
  const { users, setUsers } = useUsersContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(
    categories.filter((cat) => cat.canHaveUsers())[0].id,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.length > 0 && email.length > 0) {
      const newUser = new User(name, email, category);

      setUsers([...users, newUser]);

      setName('');
      setEmail('');
      setCategory(categories[0].id);
    }
  }

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit}>
        <h1>New User</h1>
        <div>
          <label htmlFor="new-user-name">New User Name</label>:
          <input
            type="text"
            id="new-user-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-user-email">New User Email</label>:
          <input
            type="email"
            id="new-user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-user-category">New User Category</label>:
          <select
            id="new-user-category"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          >
            {categories.map((cat) => {
              if (cat.canHaveUsers()) {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
    </div>
  );
};

export default NewUser;
