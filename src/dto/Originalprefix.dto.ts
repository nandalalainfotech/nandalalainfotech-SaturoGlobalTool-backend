import { Originalprefix001mb } from "src/entity/Originalprefix001mb";

export class OriginalPrefixDTO {
    id: number;
    originalPrefix: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;


    setProperties(originalprefix001mb: Originalprefix001mb) {
        this.id = originalprefix001mb.id;
        this.originalPrefix = originalprefix001mb.originalPrefix;
        this.insertUser = originalprefix001mb.insertUser;
        this.insertDatetime = originalprefix001mb.insertDatetime;
        this.updatedUser = originalprefix001mb.updatedUser;
        this.updatedDatetime = originalprefix001mb.updatedDatetime;
    }
}