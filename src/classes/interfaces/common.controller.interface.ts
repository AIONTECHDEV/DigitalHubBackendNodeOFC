import { Request } from "express";

export interface ICommonController {

    mapRequest(req: any) : any;
    validateRequestData(d: any) : boolean;

}