import { v4 } from 'uuid';

export interface ICategory {
  name: string;
  parentId: string;
}

export class Category implements ICategory {
  readonly name: string;
  readonly parentId: string;
  readonly id: string;
  readonly level: 0 | 1 | 2;
  private canHaveUser = true;

  constructor(
    name: string,
    level: 0 | 1 | 2,
    parentId: string,
    canHaveUser?: boolean,
  ) {
    this.name = name;
    this.parentId = parentId;
    this.level = level;
    this.id = v4();
    if (canHaveUser) {
      this.canHaveUser = canHaveUser;
    }
  }

  canHaveUsers() {
    return this.canHaveUser;
  }

  enableUsers() {
    this.canHaveUser = true;
  }

  disableUsers() {
    this.canHaveUser = false;
  }
}
