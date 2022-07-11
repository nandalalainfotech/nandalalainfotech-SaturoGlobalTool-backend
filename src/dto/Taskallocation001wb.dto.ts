import { Taskallocation001wb } from "src/entity/Taskallocation001wb";

export class TaskallocationDTO {
    taskallocationSlno: number;
    curatorName: string;
    cbatchNo: string | null;
    curatorTanNo: string | null;
    curatorAllocateDate: Date | null;
    status: string | null;
    reviewerName: string | null;
    rbatchNo: string | null;
    reviewerTanNo: string | null;
    reviewerAllocateDate: Date;
    reviewerStatus: string | null;
    filename: string | null;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    reviewerUpdatedDate: Date | null;

    setProperties(taskallocation001wb: Taskallocation001wb) {
        this.taskallocationSlno = taskallocation001wb.taskallocationSlno;
        this.curatorName = taskallocation001wb.curatorName;
        this.cbatchNo = taskallocation001wb.cbatchNo;
        this.curatorTanNo = taskallocation001wb.curatorTanNo;
        this.curatorAllocateDate = taskallocation001wb.curatorAllocateDate;
        this.status = taskallocation001wb.status;
        this.reviewerName = taskallocation001wb.reviewerName;
        this.rbatchNo = taskallocation001wb.rbatchNo;
        this.reviewerTanNo = taskallocation001wb.reviewerTanNo;
        this.filename = taskallocation001wb.filename;
        this.reviewerAllocateDate = taskallocation001wb.reviewerAllocateDate;
        this.reviewerStatus = taskallocation001wb.reviewerStatus;
        this.insertUser = taskallocation001wb.insertUser;
        this.insertDatetime = taskallocation001wb.insertDatetime;
        this.updatedUser = taskallocation001wb.updatedUser;
        this.updatedDatetime = taskallocation001wb.updatedDatetime;
        this.reviewerUpdatedDate = taskallocation001wb.reviewerUpdatedDate;
    }
}