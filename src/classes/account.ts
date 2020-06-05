export class Account {

    readonly account: number;
    private balance: number;
    readonly owner: number;
    readonly createdAt: string = new Date().toISOString();

    constructor(account: number, balance: number) {
        this.owner = Math.floor(Math.random()*(10000000 - 1000 + 1) + 1000);
        this.account = account;
        this.balance = balance;
    }

    updateBalance = (amount: number) : void => {
        this.balance += amount;
    }

    getBalance = () : number => {
        return this.balance;
    }


}