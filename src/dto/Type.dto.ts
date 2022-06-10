import { Type001mb } from "src/entity/Type001mb";

export class TypeDTO {
    id: number;
    type: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(type001mb: Type001mb) {
        this.id = type001mb.id;
        this.type = type001mb.type;
        this.insertUser = type001mb.insertUser;
        this.insertDatetime = type001mb.insertDatetime;
        this.updatedUser = type001mb.updatedUser;
        this.updatedDatetime = type001mb.updatedDatetime;
    }
}