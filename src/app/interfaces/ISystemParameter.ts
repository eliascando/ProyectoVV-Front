import { ISystemParameterDetails } from "./ISystemParameterDetails";

export interface ISystemParameter {
    id: number;
    description: string;
    creationTime: Date;
    details: ISystemParameterDetails[];
}