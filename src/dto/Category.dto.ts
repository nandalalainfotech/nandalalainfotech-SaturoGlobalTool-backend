import { Category001mb } from "src/entity/Category001mb";

export class CategoryDTO {
    id: number;
    category: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(category001mb: Category001mb) {
        this.id = category001mb.id;
        this.category = category001mb.category;
        this.insertUser = category001mb.insertUser;
        this.insertDatetime = category001mb.insertDatetime;
        this.updatedUser = category001mb.updatedUser;
        this.updatedDatetime = category001mb.updatedDatetime;
    }
}