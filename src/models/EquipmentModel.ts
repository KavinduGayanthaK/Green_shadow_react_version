export class EquipmentModel{
    equipmentId:string;
    equipmentName:string;
    type:string;
    totalCount:number;
    status:string;
    allocatedFields:string[];
    allocatedStaffMembers:string[];

    constructor(equipmentId:string,equipmentName:string,type:string,totalCount:number,status:string,
        allocatedFields:string[],allocatedStaffMembers:string[]) {

        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        this.type = type;
        this.totalCount = totalCount;
        this.status = status;
        this.allocatedFields = allocatedFields;
        this.allocatedStaffMembers = allocatedStaffMembers;
    }
}