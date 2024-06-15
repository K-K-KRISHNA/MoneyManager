import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Datacontext from "../context/DataContext";

interface values {
  Shopping: number;
  Food: number;
  Entertainment: number;
  Other: number;
}

const ExpenseChart = () => {
  const { transactionList } = React.useContext(Datacontext);
  let [values, setValues] = React.useState<values>({
    Shopping: 0,
    Food: 0,
    Entertainment: 0,
    Other: 0,
  });

  React.useEffect(() => {
    console.log(transactionList);
    let temp: values = {
      Shopping: 0,
      Food: 0,
      Entertainment: 0,
      Other: 0,
    };
    transactionList.map((each) => {
      if (each.amount < 0 && !each.isFailed) {
        temp = {
          ...temp,
          [each.category]:
            Number(temp[each.category as keyof typeof temp]) +
            Number(each.amount * -1),
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
            { id: 0, value: values.Shopping, label: "Shopping" },
            { id: 1, value: values.Entertainment, label: "Entertainment" },
            { id: 2, value: values.Food, label: "Food" },
            { id: 3, value: values.Other, label: "Other" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
};

export default ExpenseChart;
