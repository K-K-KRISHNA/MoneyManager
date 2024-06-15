import { createContext } from "react";

interface DatacontextObj {
  activeUser: string;
  transactionList: {
    user: string;
    category: string;
    amount: number;
    note: string;
    time: string;
    isFailed: boolean;
  }[];
  income: number;
  expense: number;
}

const Datacontext = createContext({
  activeUser: "",
  transactionList: [
    {
      user: "",
      category: "",
      amount: 0,
      note: "",
      time: "",
      isFailed: false,
    },
  ],
  setActiveUser: (value: string) => {},
  setTransactionList: (temp: DatacontextObj["transactionList"]) => {},
  income: 0,
  expense: 0,
  setIncome: (income: number) => {},
  setExpense: (expense: number) => {},
});

export default Datacontext;
