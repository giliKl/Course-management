export enum role {
    Teacher = 'teacher',
    Student = 'student',
    Admin = 'admin'
}
export class User {
    constructor(
       //public id:number,
       public name:string,
       public email:string,
       public password:string,
       public role:role
    ) { }
}
export type partOfUser=Partial<User>;