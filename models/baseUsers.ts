import { baseCategories } from './baseCategories';
import { names } from './first-names';
import { User } from './User';

export const baseUsers: User[] = [];

for (let i = 1; i <= 30; i++) {
  const filteredCategories = baseCategories.filter((cat) => cat.canHaveUsers());

  const category =
    filteredCategories[
      Math.floor(Math.random() * (filteredCategories.length - 1))
    ];

  const name = names[Math.floor(Math.random() * (names.length - 1))];

  console.log(category);

  baseUsers.push(
    new User(name, `${name.toLowerCase()}@example.com`, category.id),
  );
}
