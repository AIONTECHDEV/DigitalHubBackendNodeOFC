import { ICommonController } from "../classes/interfaces/common.controller.interface";
import { TransferMoneyService } from "../services/transfermoney.service";
import { Request, Response } from "express";
import { Account } from "../classes/account";

export class AccountBalanceController implements ICommonController {
    
    private transactionMoneyService: TransferMoneyService;

    constructor(transactionMoneyService: TransferMoneyService) {
        this.transactionMoneyService = transactionMoneyService;
    }

    mapRequest = (req: Request) : number | undefined => {
        let accountNumber: number | undefined = undefined;
        accountNumber = Number(req.params.account);
        return accountNumber;
    }

    validateRequestData = (d: any): boolean => {
        throw new Error("Method not implemented.");
    }

    getBalanceAccount = (req: Request, res: Response) : Response => {
        let accountNumber: number | undefined = this.mapRequest(req);
        let account: Account | undefined = undefined;
        if (accountNumber) {
            account = this.transactionMoneyService.getAccount(accountNumber);
        }

        return res.status(200).json(account);

    }

}