import { Category } from './category';
import { UUID } from 'angular2-uuid';

export class Entity {
  private _id: string; //uuid
  name: string;
  descriptionPatterns: string[] = [];
  referenceCategory: Category | null = null;

  constructor(
    name: string,
  ) {
    this._id = UUID.UUID();
    this.name = name;
  }

  public get id(): string {
    return this._id;
  }

  public importId(id:string): void {
    this._id = id;
  }
}
