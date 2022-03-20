import { baseCategories } from './baseCategories';
import { User } from './User';

export const baseUsers: User[] = [];

for (let i = 1; i <= 30; i++) {
  const filteredCategories = baseCategories.filter((cat) => cat.canHaveUsers());

  const category =
    filteredCategories[
      Math.floor(Math.random() * (filteredCategories.length - 1))
    ];

  console.log(category);

  baseUsers.push(new User(`User #${i}`, `user${i}@example.com`, category.id));
}
