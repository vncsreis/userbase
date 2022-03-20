import { Category } from './Category';

const rootCategories = [
  new Category('Category 1', 0, '0', false),
  new Category('Category 2', 0, '0', false),
  new Category('Category 3', 0, '0', false),
];

const secondLevelCategories = [
  new Category('Category 1.1', 1, rootCategories[0].id, false),
  new Category('Category 1.2', 1, rootCategories[0].id),
  new Category('Category 1.3', 1, rootCategories[0].id),
  new Category('Category 2.1', 1, rootCategories[1].id),
  new Category('Category 2.2', 1, rootCategories[1].id),
  new Category('Category 3.1', 1, rootCategories[2].id),
];

const thirdLevelCategories = [
  new Category('Category 1.1.1', 2, secondLevelCategories[0].id),
  new Category('Category 1.1.2', 2, secondLevelCategories[0].id),
];

const categories = [
  ...rootCategories,
  ...secondLevelCategories,
  ...thirdLevelCategories,
];

export const baseCategories = categories.map((cat) => {
  categories.forEach((catInner) => {
    if (cat.id === catInner.parentId) {
      cat.disableUsers();
    }
  });
  return cat;
});
