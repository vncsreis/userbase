import { User } from '../../models/User';
import styles from './UsersTable.module.css';

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.cell}>Name</th>
          <th className={styles.cell}>E-mail</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td className={styles.cell}>{user.name}</td>
              <td className={styles.cell}>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
