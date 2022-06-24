import { OriginalPrefixDTO } from "src/dto/Originalprefix.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";
import { Measurement001wb } from "./Measurement001wb";

@Entity("originalprefix001mb", { schema: "saturo" })
export class Originalprefix001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "originalPrefix", length: 20 })
  originalPrefix: string;

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
  //   (measurement001wb) => measurement001wb.originalPrefixSlno2
  // )
  // measurement001wbs: Measurement001wb[];

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.originalPrefixSlno2)
  assay001wbs: Assay001wb[];


  setProperties(originalPrefixDTO: OriginalPrefixDTO) {
    this.id = originalPrefixDTO.id;
    this.originalPrefix = escape(originalPrefixDTO.originalPrefix);
    this.insertUser = originalPrefixDTO.insertUser;
    this.insertDatetime = originalPrefixDTO.insertDatetime;
    this.updatedUser = originalPrefixDTO.updatedUser;
    this.updatedDatetime = originalPrefixDTO.updatedDatetime;
}
}
