import { createContext, useContext, useState } from 'react';
import { baseUsers } from '../models/baseUsers';
import { User } from '../models/User';

interface UsersContext {
  users: User[];
  setUsers: (list: User[]) => void;
}

const initContext: UsersContext = {
  users: [],
  setUsers: (list) => {},
};

const Users = createContext<UsersContext>(initContext);

const UsersContext = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [users, setUsers] = useState<User[]>(baseUsers);

  return (
    <Users.Provider value={{ users, setUsers }}>{children}</Users.Provider>
  );
};

export default UsersContext;

export const useUsersContext = () => {
  return useContext(Users);
};
