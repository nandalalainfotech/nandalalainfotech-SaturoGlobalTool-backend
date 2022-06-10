import { UnitlowendvalueDTO } from "src/dto/Unitlowendvalue.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";

@Entity("unitlowendvalue001mb", { schema: "saturo" })
export class Unitlowendvalue001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "united", length: 30 })
  united: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.unitedSlno2)
  assay001wbs: Assay001wb[];


  setProperties(unitlowendvalueDTO: UnitlowendvalueDTO) {
    this.id = unitlowendvalueDTO.id;
    this.united = unitlowendvalueDTO.united;
    this.insertUser = unitlowendvalueDTO.insertUser;
    this.insertDatetime = unitlowendvalueDTO.insertDatetime;
    this.updatedUser = unitlowendvalueDTO.updatedUser;
    this.updatedDatetime = unitlowendvalueDTO.updatedDatetime;
  }
}
