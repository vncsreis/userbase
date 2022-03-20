import React, { useEffect, useState } from 'react';
import { useCategoriesContext } from '../../../context/CategoriesContext';
import { useUsersContext } from '../../../context/UsersContext';
import { Category } from '../../../models/Category';
import styles from './NewCategory.module.css';

const NewCategory = () => {
  const [selectedLevel, setSelectedLevel] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState<string>('');
  const [parentCategoryId, setParentCategoryId] = useState<string>('');
  const [categoriesOnSelect, setCategoriesOnSelect] = useState<string[]>([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState<Category[]>(
    [],
  );
  const [secondLevelCategories, setSecondLevelCategories] = useState<
    Category[]
  >([]);
  const [categoriesCanHaveUser, setCategoriesCanHaveUser] = useState<
    Category[]
  >([]);
  const { categories, setCategories } = useCategoriesContext();
  const { users } = useUsersContext();

  function formatFormCategories(categoriesArray: Category[]) {
    const firstLevel: Category[] = [];
    const secondLevel: Category[] = [];
    categoriesArray.forEach((cat) => {
      if (cat.level === 0) {
        firstLevel.push(cat);
      } else if (cat.level === 1) {
        secondLevel.push(cat);
      }
    });

    return [firstLevel, secondLevel];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.length === 0) {
      window.alert('Empty name');
      return;
    }

    let categoryArray = [...categories];

    const category = new Category(name, selectedLevel, parentCategoryId);

    if (users.find((user) => user.category === category.parentId)) {
      const parentCategory = categories.find(
        (cat) => cat.id === parentCategoryId,
      );
      if (parentCategory) {
        const userReplaceCategory = new Category(
          parentCategory.name,
          (parentCategory.level + 1) as 1 | 2,
          parentCategory.id,
        );

        users.forEach((user) => {
          if (user.category === parentCategory.id) {
            user.category = userReplaceCategory.id;
          }
        });

        categoryArray.push(userReplaceCategory);
      }

      window.alert('Users in parent category! Category cloned as child');
    }

    if (parentCategoryId !== '0') {
      categoryArray = categoryArray.map((cat) => {
        if (cat.id === parentCategoryId) {
          cat.disableUsers();
        }
        return cat;
      });
    }

    setCategories([...categoryArray, category]);
  }

  useEffect(() => {
    console.log('changed');
    const [firstLevel, secondLevel] = formatFormCategories(categories);
    setFirstLevelCategories(firstLevel);
    setSecondLevelCategories(secondLevel);
    setCategoriesOnSelect([firstLevel[0].id, secondLevel[0].id]);
    setCategoriesCanHaveUser(categories.filter((cat) => cat.canHaveUsers()));
  }, [categories]);

  return (
    <div>
      {categoriesCanHaveUser.map((cat) => {})}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category-name">New Category Name</label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.radioInputs}>
          <div className={styles.radioInputRow}>
            <label htmlFor="radio-0">Root level category</label>
            <input
              type="radio"
              id="radio-0"
              checked={selectedLevel === 0}
              onClick={() => {
                // setParentCategory([0]);
                setSelectedLevel(0);
              }}
            />
          </div>
          <div className={styles.radioInputRow}>
            <label htmlFor="radio-1">Subcategory</label>
            <input
              type="radio"
              id="radio-1"
              checked={selectedLevel === 1}
              onClick={() => {
                setSelectedLevel(1);
                setParentCategoryId(categoriesOnSelect[0]);
              }}
            />
          </div>
          <div className={styles.radioInputRow}>
            <label htmlFor="radio-2">Sub-Subcategory</label>
            <input
              type="radio"
              id="radio-2"
              checked={selectedLevel === 2}
              onClick={() => {
                setSelectedLevel(2);
                setParentCategoryId(categoriesOnSelect[1]);
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="select-parent-1">Select Parent Category</label>
          {selectedLevel >= 1 && (
            <select
              value={categoriesOnSelect[0]}
              id="select-parent-1"
              onChange={(e) => {
                setCategoriesOnSelect([
                  e.currentTarget.value,
                  categoriesOnSelect[1],
                ]);
                if (selectedLevel === 1) {
                  setParentCategoryId(e.currentTarget.value);
                } else if (selectedLevel === 2) {
                  const correctedCatId = secondLevelCategories.filter(
                    (cat) => cat.parentId === e.currentTarget.value,
                  )[0].id;

                  setCategoriesOnSelect([
                    e.currentTarget.value,
                    correctedCatId,
                  ]);
                  setParentCategoryId(correctedCatId);
                }
              }}
            >
              {firstLevelCategories.map((cat) => {
                if (selectedLevel === 1) {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                } else if (selectedLevel === 2) {
                  if (cat.hasChildCategory()) {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  }
                }
              })}
            </select>
          )}
          {selectedLevel === 2 && (
            <select
              id="select-parent-2"
              value={categoriesOnSelect[1]}
              onChange={(e) => {
                setCategoriesOnSelect([
                  categoriesOnSelect[0],
                  e.currentTarget.value,
                ]);
                if (selectedLevel === 2) {
                  setParentCategoryId(e.currentTarget.value);
                }
              }}
            >
              {secondLevelCategories.map((cat) => {
                if (cat.level === 1 && cat.parentId === categoriesOnSelect[0]) {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                }
              })}
            </select>
          )}
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewCategory;
