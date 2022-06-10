import { UnitSingleValueDTO } from "src/dto/Unitsinglevalue.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";

@Entity("unitsinglevalue001mb", { schema: "saturo" })
export class Unitsinglevalue001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "unit", length: 30 })
  unit: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.unitSlno2)
  assay001wbs: Assay001wb[];


  setProperties(unitSingleValueDTO: UnitSingleValueDTO) {
    this.id = unitSingleValueDTO.id;
    this.unit = unitSingleValueDTO.unit;
    this.insertUser = unitSingleValueDTO.insertUser;
    this.insertDatetime = unitSingleValueDTO.insertDatetime;
    this.updatedUser = unitSingleValueDTO.updatedUser;
    this.updatedDatetime = unitSingleValueDTO.updatedDatetime;
}
}
