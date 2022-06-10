import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";

export class CategoryFunctionDTO {
    id: number;
    function: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(categoryfunction001mb: Categoryfunction001mb) {
        this.id = categoryfunction001mb.id;
        this.function = categoryfunction001mb.function;
        this.insertUser = categoryfunction001mb.insertUser;
        this.insertDatetime = categoryfunction001mb.insertDatetime;
        this.updatedUser = categoryfunction001mb.updatedUser;
        this.updatedDatetime = categoryfunction001mb.updatedDatetime;
    }
}