import { IPlant } from "./plant";

export interface IEmployee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  nic: string;
  address: string;
  plant:IPlant;
  userType:string;
}
