import { TypeDTO } from "src/dto/Type.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";
import { Measurement001wb } from "./Measurement001wb";

@Entity("type001mb", { schema: "saturo" })
export class Type001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "type", length: 50 })
  type: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  // @OneToMany(
  //   () => Measurement001wb,
  //   (measurement001wb) => measurement001wb.typeSlno2
  // )
  // measurement001wbs: Measurement001wb[];

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.typeSlno2)
  assay001wbs: Assay001wb[];

  setProperties(typeDTO: TypeDTO) {
    this.id = typeDTO.id;
    this.type = escape(typeDTO.type);
    this.insertUser = typeDTO.insertUser;
    this.insertDatetime = typeDTO.insertDatetime;
    this.updatedUser = typeDTO.updatedUser;
    this.updatedDatetime = typeDTO.updatedDatetime;
}
}
