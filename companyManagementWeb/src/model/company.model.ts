export interface company{
    id:string;
    name:string;
    industry:string;
    numberOfEmployees:number;
    city:string;
    parentCompany:company;
    level:number;
} 