import { v4 } from 'uuid';

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly category: string;

  constructor(name: string, email: string, category: string) {
    this.email = email;
    this.name = name;
    this.category = category;
    this.id = v4();
  }
}
