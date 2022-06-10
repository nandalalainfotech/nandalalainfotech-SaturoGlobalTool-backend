import { TaskallocationDTO } from "src/dto/Taskallocation001wb.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("taskallocation001wb", { schema: "saturo" })
export class Taskallocation001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "curator_id" })
  curatorId: number;

  @Column("varchar", { name: "curator_name", nullable: true, length: 50 })
  curatorName: string | null;

  @Column("varchar", { name: "cbatch_no", nullable: true, length: 50 })
  cbatchNo: string | null;

  @Column("varchar", { name: "curator_tan_no", nullable: true, length: 50 })
  curatorTanNo: string | null;

  @Column("datetime", { name: "curator_allocate_date", nullable: true })
  curatorAllocateDate: Date | null;

  @Column("varchar", { name: "reviewer_name", nullable: true, length: 50 })
  reviewerName: string | null;

  @Column("varchar", { name: "rbatch_no", nullable: true, length: 50 })
  rbatchNo: string | null;

  @Column("varchar", { name: "reviewer_tan_no", nullable: true, length: 50 })
  reviewerTanNo: string | null;

  @Column("datetime", { name: "reviewer_allocate_date", nullable: true })
  reviewerAllocateDate: Date | null;

  @Column("varchar", { name: "filename", nullable: true, length: 200 })
  filename: string | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;



  setProperties(taskallocationDTO: TaskallocationDTO) {
    this.curatorId = taskallocationDTO.curatorId;
    this.curatorName = taskallocationDTO.curatorName;
    this.cbatchNo = taskallocationDTO.cbatchNo;
    this.curatorTanNo = taskallocationDTO.curatorTanNo;
    this.curatorAllocateDate = taskallocationDTO.curatorAllocateDate;
    this.reviewerName = taskallocationDTO.reviewerName;
    this.rbatchNo = taskallocationDTO.rbatchNo;
    this.reviewerTanNo = taskallocationDTO.reviewerTanNo;
    this.filename = taskallocationDTO.filename;
    this.reviewerAllocateDate = taskallocationDTO.reviewerAllocateDate;
    this.insertUser = taskallocationDTO.insertUser;
    this.insertDatetime = taskallocationDTO.insertDatetime;
    this.updatedUser = taskallocationDTO.updatedUser;
    this.updatedDatetime = taskallocationDTO.updatedDatetime;
}
}
