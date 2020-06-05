import { Response, Request } from "express";
import { ICommonController } from "../classes/interfaces/common.controller.interface";
import { TransferMoneyService } from "../services/transfermoney.service";
import { ITransferMoney } from "../classes/request/transfermoney.request";
import { isNumber } from "util";

export class TransactionHistoryController implements ICommonController {

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

    getAllTransactionsHistory = (req: Request, res: Response) : Response => {
        let account: number | undefined = this.mapRequest(req);
        let transactions: Array<ITransferMoney> = [];

        if(account) {
            let allTransactions: Array<ITransferMoney> = this.transactionMoneyService.getTransactionsHistory();
            let fromTransactions: Array<ITransferMoney> = allTransactions.filter( (element, index, array) => {
                return element.fromAccount === account;
            });

            let toTransactions: Array<ITransferMoney> = allTransactions.filter( (element, index, array) => {
                return element.toAccount === account;
            });

            let mergeArray: Array<ITransferMoney> = [...new Set([...fromTransactions, ...toTransactions])];
            let filteredArray: Array<ITransferMoney> = [...mergeArray];
            transactions = filteredArray;
        }
        
        let responseObj : Object = {
            transactions
        };
        return res.status(200).json(responseObj);
    }

    getReceivedTransactionsHistory = (req: Request, res: Response) : Response => {
        let account: number | undefined = this.mapRequest(req);
        let transactions: Array<ITransferMoney> = [];

        if(account) {
            let allTransactions: Array<ITransferMoney> = this.transactionMoneyService.getTransactionsHistory();
            let fromTransactions: Array<ITransferMoney> = allTransactions.filter( (element, index, array) => {
                return element.fromAccount === account;
            });

            transactions = fromTransactions;
        }
        
        let responseObj : Object = {
            transactions
        };
        return res.status(200).json(responseObj);
    }

    getSentTransactionsHistory = (req: Request, res: Response) : Response => {
        let account: number | undefined = this.mapRequest(req);
        let transactions: Array<ITransferMoney> = [];

        if(account) {
            let allTransactions: Array<ITransferMoney> = this.transactionMoneyService.getTransactionsHistory();
            let toTransactions: Array<ITransferMoney> = allTransactions.filter( (element, index, array) => {
                return element.toAccount === account;
            });

            transactions = toTransactions;
        }
        
        let responseObj : Object = {
            transactions
        };
        return res.status(200).json(responseObj);
    }

}