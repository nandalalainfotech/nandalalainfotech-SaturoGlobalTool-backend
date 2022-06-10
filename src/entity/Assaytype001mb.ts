import { AssayTypeDTO } from "src/dto/Assaytype.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";

@Entity("assaytype001mb", { schema: "saturo" })
export class Assaytype001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "assayType", length: 30 })
  assayType: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.assayTypeSlno2)
  assay001wbs: Assay001wb[];

  setProperties(assayTypeDTO: AssayTypeDTO) {
    this.id = assayTypeDTO.id;
    this.assayType = assayTypeDTO.assayType;
    this.insertUser = assayTypeDTO.insertUser;
    this.insertDatetime = assayTypeDTO.insertDatetime;
    this.updatedUser = assayTypeDTO.updatedUser;
    this.updatedDatetime = assayTypeDTO.updatedDatetime;
  }
}
