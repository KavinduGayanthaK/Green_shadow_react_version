export class StaffModel {
    staffId:string;
    firstName:string;
    lastName:string;
    designation:string
    gender:string;
    joinedDate:string;
    dateOfBirth:string;
    buildingNumber:string;
    lane:string;
    city:string;
    state:string;
    postalCode:string;
    contactNumber:number;
    email:string;
    role:string;
    fields:[];
    vehicles:[];
    equipments:[];

    constructor(id:string,firstName:string,lastName:string,designation:string,gender:string,joinedDate:string,dateOfBirth:string,buildingNumber:string,lane:string,city:string,
        state:string,postalCode:string,contactNumber:number,email:string,role:string,fields:[],vehicles:[],equipments:[]) {
            
        this.staffId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.designation = designation;
        this.gender = gender;
        this.joinedDate = joinedDate;
        this.dateOfBirth = dateOfBirth;
        this.buildingNumber = buildingNumber;
        this.lane = lane;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.contactNumber = contactNumber;
        this.email = email;
        this.role = role;
        this.fields = fields;
        this.vehicles = vehicles;
        this.equipments = equipments;
    }
}