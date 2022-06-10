import { ToxicityDTO } from "src/dto/Toxicity.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";

@Entity("toxicity001mb", { schema: "saturo" })
export class Toxicity001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "toxiCity", length: 30 })
  toxiCity: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.toxiCitySlno2)
  assay001wbs: Assay001wb[];


  setProperties(toxicityDTO: ToxicityDTO) {
    this.id = toxicityDTO.id;
    this.toxiCity = toxicityDTO.toxiCity;
    this.insertUser = toxicityDTO.insertUser;
    this.insertDatetime = toxicityDTO.insertDatetime;
    this.updatedUser = toxicityDTO.updatedUser;
    this.updatedDatetime = toxicityDTO.updatedDatetime;
  }
}
