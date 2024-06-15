import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Datacontext from "../context/DataContext";

interface values {
  Salary: number;
  Agriculture: number;
  Business: number;
  Other: number;
}

export const IncomeChart = () => {
  const { transactionList } = React.useContext(Datacontext);
  let [values, setValues] = React.useState<values>({
    Salary: 0,
    Agriculture: 0,
    Business: 0,
    Other: 0,
  });

  React.useEffect(() => {
    console.log(transactionList);
    let temp: values = {
      Salary: 0,
      Agriculture: 0,
      Business: 0,
      Other: 0,
    };
    transactionList.map((each) => {
      if (each.amount > 0 && !each.isFailed) {
        temp = {
          ...temp,
          [each.category]:
            Number(temp[each.category as keyof typeof temp]) +
            Number(each.amount),
        };
        // console.log(values.Agriculture);
      }
    });
    setValues(temp);
    console.log(values);
  }, [transactionList]);

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: values.Salary, label: "Salary" },
            { id: 1, value: values.Agriculture, label: "Agriculture" },
            { id: 2, value: values.Business, label: "Business" },
            { id: 3, value: values.Other, label: "Other" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
};
