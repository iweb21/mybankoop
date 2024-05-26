import inquirer from 'inquirer';

class BankAccount {
  private balance: number;

  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.balance += amount;
    console.log(`Deposited: $${amount}. Current balance: $${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdrawal amount must be positive.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds.");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrew: $${amount}. Current balance: $${this.balance}`);
  }

  checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
  }
}

class BankApp {
  private account: BankAccount;

  constructor() {
    this.account = new BankAccount();
  }

  async start(): Promise<void> {
    while (true) {
      const ans = await inquirer.prompt({
        name: 'select',
        type: 'list',
        message: 'Select an operation:',
        choices: ['Deposit', 'Withdraw', 'Check Balance', 'Exit'],
      });

      switch (ans.select) {
        case 'Deposit':
          await this.handleDeposit();
          break;
        case 'Withdraw':
          await this.handleWithdraw();
          break;
        case 'Check Balance':
          this.account.checkBalance();
          break;
        case 'Exit':
          console.log('Exiting...');
          return;
        default:
          console.log('Invalid selection.');
          break;
      }
    }
  }

  private async handleDeposit(): Promise<void> {
    const answer = await inquirer.prompt({
      name: 'amount',
      type: 'number',
      message: 'Enter the amount to deposit:',
      validate: (value: number) => (value > 0 ? true : 'Please enter a valid positive number.'),
    });
    this.account.deposit(answer.amount);
  }

  private async handleWithdraw(): Promise<void> {
    const answer = await inquirer.prompt({
      name: 'amount',
      type: 'number',
      message: 'Enter the amount to withdraw:',
      validate: (value: number) => (value > 0 ? true : 'Please enter a valid positive number.'),
    });
    this.account.withdraw(answer.amount);
  }
}

// Start the bank application
const app = new BankApp();
app.start();
