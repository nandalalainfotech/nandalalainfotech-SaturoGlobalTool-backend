import { Toxicity001mb } from "src/entity/Toxicity001mb";

export class ToxicityDTO {
    id: number;
    toxiCity: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(toxicity001mb: Toxicity001mb) {
        this.id = toxicity001mb.id;
        this.toxiCity = toxicity001mb.toxiCity;
        this.insertUser = toxicity001mb.insertUser;
        this.insertDatetime = toxicity001mb.insertDatetime;
        this.updatedUser = toxicity001mb.updatedUser;
        this.updatedDatetime = toxicity001mb.updatedDatetime;
    }
}