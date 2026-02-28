import { UUID } from 'angular2-uuid';

export class Category {
  private _id: string; //uuid
  name: string;
  descriptionPatterns: string[] = [];
  private _topLevelCategory?: Category;
  innerCategories: Category[] = [];

  constructor(
    name: string,
    topLevelCategory?: Category
  ) {
    this._id = UUID.UUID();
    this.name = name;
    this._topLevelCategory = topLevelCategory;
  }

  public get id(): string {
    return this._id;
  }

  public get topLevelCategory(): Category | null {
    return this._topLevelCategory || null;
  }

  public importId(id:string): void {
    this._id = id;
  }
}
