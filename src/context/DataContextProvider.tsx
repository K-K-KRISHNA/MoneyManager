import React, { SetStateAction, useEffect, useState } from "react";
import DataContext from "./DataContext";

interface single {
  user: string;
  category: string;
  amount: number;
  note: string;
  time: string;
  isFailed: boolean;
}

interface Istate {
  activeUser: string;
  transactionList: single[];
  income: number;
  expense: number;
}

interface Iprops {
  children: React.ReactNode;
}

export const DataContextProvider = ({ children }: Iprops) => {
  const [activeUser, setActiveUser] = useState<Istate["activeUser"]>("");
  const [income, setIncome] = useState<Istate["income"]>(0);
  const [expense, setExpense] = useState<Istate["expense"]>(0);
  const [transactionList, setTransactionList] = useState<
    Istate["transactionList"]
  >([
    {
      user: "",
      category: "",
      amount: 0,
      note: "",
      time: "",
      isFailed: true,
    },
  ]);

  useEffect(() => {
    const listItemsFromStorage = localStorage.getItem("list");
    if (listItemsFromStorage !== null) {
      let tempIncome: number = 0,
        tempExpense: number = 0;
      const listItems = JSON.parse(listItemsFromStorage);
      setTransactionList(listItems);
      listItems.map((each: single) => {
        if (!each.isFailed) {
          if (each.amount > 0) tempIncome += Number(each.amount);
          else tempExpense += Number(each.amount);
        }
      });
      setIncome(tempIncome);
      setExpense(tempExpense);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        activeUser,
        setActiveUser,
        transactionList,
        setTransactionList,
        income,
        setIncome,
        expense,
        setExpense,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
