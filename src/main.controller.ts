import { Application } from "express";
import { TransferMoneyController } from "./controllers/transfermoney.controller"
import * as CONST from "./constants";
import { TransferMoneyService } from "./services/transfermoney.service";
import { TransactionHistoryController } from "./controllers/transactionhistory.controller";
import { AccountBalanceController } from "./controllers/accountbalance.controller";

export class MainController {

    private transferMoneyController: TransferMoneyController;
    private transactionHistoryController: TransactionHistoryController;
    private accountBalanceController: AccountBalanceController;

    private transferMoneyService: TransferMoneyService;

    constructor(private app: Application) {
        this.transferMoneyService = new TransferMoneyService();
        this.transferMoneyController = new TransferMoneyController(this.transferMoneyService);
        this.transactionHistoryController = new TransactionHistoryController(this.transferMoneyService);
        this.accountBalanceController = new AccountBalanceController(this.transferMoneyService);
        this.routes();
    }

    private routes() {
        this.app.route(CONST.BASE_URL + CONST.TRANSFER_AMOUNT_ENDPOINT).post(this.transferMoneyController.transferMoney);
        this.app.route(CONST.BASE_URL + CONST.TRANSACTION_HISTORY_ENDPOINT).get(this.transactionHistoryController.getAllTransactionsHistory);
        this.app.route(CONST.BASE_URL + CONST.TRANSACTION_RECEIVED_HISTORY_ENDPOINT).get(this.transactionHistoryController.getReceivedTransactionsHistory);
        this.app.route(CONST.BASE_URL + CONST.TRANSACTION_SENT_HISTORY_ENDPOINT).get(this.transactionHistoryController.getSentTransactionsHistory);
        this.app.route(CONST.BASE_URL + CONST.ACCOUNT_BALANCE_ENDPOINT).get(this.accountBalanceController.getBalanceAccount);
    }

}