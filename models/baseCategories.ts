import { Category } from './Category';

const rootCategories = [
  new Category('Students', 0, '0', false),
  new Category('Teachers', 0, '0', false),
  new Category('Administrators', 0, '0', false),
];

const secondLevelCategories = [
  new Category('1st Year', 1, rootCategories[0].id, false),
  new Category('2nd Year', 1, rootCategories[0].id),
  new Category('3rd Year', 1, rootCategories[0].id),
  new Category('Humanities', 1, rootCategories[1].id),
  new Category('Sciences', 1, rootCategories[1].id),
];

const thirdLevelCategories = [
  new Category('Tansfers', 2, secondLevelCategories[0].id),
  new Category('Same School', 2, secondLevelCategories[0].id),
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
      cat.enableChild();
    }
  });
  return cat;
});
