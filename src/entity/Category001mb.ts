import { CategoryDTO } from "src/dto/Category.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";

@Entity("category001mb", { schema: "saturo" })
export class Category001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "category", length: 100 })
  category: string;

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
  //   (measurement001wb) => measurement001wb.categorySlno2
  // )
  // measurement001wbs: Measurement001wb[];

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.categorySlno2)
  assay001wbs: Assay001wb[];

  setProperties(categoryDTO: CategoryDTO) {
    this.id = categoryDTO.id;
    this.category = escape(categoryDTO.category);
    this.insertUser = categoryDTO.insertUser;
    this.insertDatetime = categoryDTO.insertDatetime;
    this.updatedUser = categoryDTO.updatedUser;
    this.updatedDatetime = categoryDTO.updatedDatetime;
}

}
