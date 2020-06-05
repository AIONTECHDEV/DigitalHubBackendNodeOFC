import { Request, Response } from "express";
import { ICommonController } from "../classes/interfaces/common.controller.interface";
import { ITransferMoney } from "../classes/request/transfermoney.request"
import { TransferMoneyService } from "../services/transfermoney.service";
import { TypeValidationUtil } from "../classes/validation.util"
import { ITransferMoneyResponse } from "../classes/response/transfermoney.response";
import { Account } from "../classes/account";

export class TransferMoneyController implements ICommonController {

    private transferMoneyService: TransferMoneyService;

    constructor(transferMoneyService: TransferMoneyService) {
        this.transferMoneyService = transferMoneyService;
    }
    
    mapRequest = (req: Request) : ITransferMoney => {
        let proxy : ITransferMoney = {
            amount: req.body.amount,
            fromAccount: req.body.fromAccount,
            toAccount: req.body.toAccount,
            sentAt: new Date().toISOString()
        };

        return proxy;
    }

    validateRequestData = (d: ITransferMoney): boolean => {
        return TypeValidationUtil.checkNumber(d.amount, false, 'amount')
                    && TypeValidationUtil.checkNumber(d.fromAccount, false, 'fromAccount')
                    && TypeValidationUtil.checkNumber(d.toAccount, false, 'toAccount');
    }
    

    public transferMoney = (req: Request, res: Response) : Response => {

        let transferMoneyReq : ITransferMoney = this.mapRequest(req);
        let requestValid : boolean = this.validateRequestData(transferMoneyReq);
        let status: number = 0;
        let description: string = "success";

        if(!requestValid) {
            status = -100;
            description = "Invalid request" 
        } else {
            if( !this.transferMoneyService.existAccount(transferMoneyReq.fromAccount) ) {
                this.transferMoneyService.addAccount(transferMoneyReq.fromAccount);
            }

            if( !this.transferMoneyService.existAccount(transferMoneyReq.toAccount) ) {
                this.transferMoneyService.addAccount(transferMoneyReq.toAccount);
            }

            let fromAccount: Account | undefined = this.transferMoneyService.getAccount(transferMoneyReq.fromAccount);
            let toAccount: Account | undefined = this.transferMoneyService.getAccount(transferMoneyReq.toAccount);
            if( fromAccount !== undefined && toAccount !== undefined ) {
                
                let fromBalance: number = fromAccount.getBalance();
                let amountToTransfer: number = transferMoneyReq.amount;
                let finalAmount: number = fromBalance - amountToTransfer;
                if( finalAmount < -500) {
                    status = -101;
                    description = "Insufficient funds to transfer";
                } else {
                    fromAccount.updateBalance(-1 * amountToTransfer);
                    toAccount.updateBalance(amountToTransfer);
                    this.transferMoneyService.addTransactionToHistory(transferMoneyReq);
                }

            }
        }

        let response: ITransferMoneyResponse = {
            status: status,
            description: description
        };

        return res.status(200).json(response);
    }

}