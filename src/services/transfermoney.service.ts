import { Account } from "../classes/account";
import { ITransferMoney } from "../classes/request/transfermoney.request";

export class TransferMoneyService {

    private accountCache: Map<number, Account> = new Map<number, Account>();
    private transactionsHistory: Array<ITransferMoney> = [];

    constructor() {}

    existAccount = (account: number) : boolean => {
        return this.accountCache.has(account);
    }

    addAccount = (account: number) : void => {
        let initialBalance: number = 0.00;
        let theAccount: Account = new Account(account, initialBalance);
        this.accountCache.set(account, theAccount);
    }

    getAccount = (account: number) : Account | undefined => {
        return this.accountCache.get(account)
    }

    updateAccount = (account: Account) => {
        this.accountCache.delete(account.account);
        this.accountCache.set(account.account, account);
    }

    addTransactionToHistory = (transaction: ITransferMoney) : void => {
        this.transactionsHistory.push(transaction);
    }

    getTransactionsHistory = () : Array<ITransferMoney> => {
        return this.transactionsHistory;
    }

}