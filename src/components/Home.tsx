import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { homeStyles } from "./Styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import incomeLogo from "../assets/incomeLogo.png";
import expenseLogo from "../assets/expenseLogo.png";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import HouseIcon from "@mui/icons-material/House";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Datacontext from "../context/DataContext";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PaidIcon from "@mui/icons-material/Paid";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ExpenseChart from "./ExpenseChart";
import { IncomeChart } from "./IncomeChart";

const dummy = [
  {
    category: "home",
    user: "user 1",
    amount: 7500,
    note: "Just Purchased new Clothes for upcoming Event",
  },
  {
    category: "shopping",
    user: "user 1",
    amount: 7500,
    note: "Just Purchased new Clothes for upcoming Event",
  },
  {
    category: "food",
    user: "user 1",
    amount: 7500,
    note: "Just Purchased new Clothes for upcoming Event",
  },
  {
    category: "Entertainment",
    user: "user 1",
    amount: 7500,
    note: "Just Purchased new Clothes for upcoming Event",
  },
  {
    category: "home",
    user: "user 1",
    amount: -7500,
    note: "Just Purchased new Clothes for upcoming Event",
  },
];

interface eachTransaction {
  amount: number;
  category: string;
  note: string;
  time: string;
  user: string;
  isFailed: boolean;
}

interface Istate {
  incomeIsOpen: boolean;
  expenseIsOpen: boolean;
  transaction: eachTransaction;
  arrayOfTransactions: eachTransaction[];
}

export const chooseIcon = (category: string) => {
  switch (category) {
    case "Shopping":
      return (
        <ShoppingBagIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#fceed4",
            color: "#faac11",
          }}
          fontSize="large"
        />
      );
    case "Food":
      return (
        <LocalDiningIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#eee5ff",
            color: "#7f3dff",
          }}
          fontSize="large"
        />
      );
    case "Entertainment":
      return (
        <LiveTvIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#e5badf",
            color: "#f93b4a",
          }}
          fontSize="large"
        />
      );
    case "Agriculture":
      return (
        <AgricultureIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#9ADE7B",
            color: "#508D69",
          }}
          fontSize="large"
        />
      );
    case "Business":
      return (
        <StorefrontIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#FFF2D8",
            color: "#EAD7BB",
          }}
          fontSize="large"
        />
      );
    case "Salary":
      return (
        <PaidIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#93B1A6",
            color: "#5C8374",
          }}
          fontSize="large"
        />
      );
    default:
      return (
        <HouseIcon
          sx={{
            ...homeStyles.categoryIcon,
            backgroundColor: "#B6FFFA",
            color: "#80B3FF",
          }}
          fontSize="large"
        />
      );
  }
};

const timeDecider = (itemDateTime: string) => {
  const tempDate = new Date(
    itemDateTime.slice(0, 10).split("/").reverse().join(",")
  );
  console.log(tempDate);
  if (
    tempDate.toLocaleDateString() === new Date(Date.now()).toLocaleDateString()
  )
    return itemDateTime.slice(12, 17);

  console.log(itemDateTime);

  return tempDate.toLocaleDateString();
};

export const eachItem = (each: eachTransaction, index: number) =>
  each.user.length !== 0 && (
    <Box key={index} pl={2}>
      <Box sx={homeStyles.listItem} key={index}>
        <Stack direction={"row"} alignItems={"center"}>
          {chooseIcon(each.category)}
          <Stack
            direction={"column"}
            sx={{ width: { xs: "150px", md: "300px" } }}
          >
            <Typography variant="body1">{each.category}</Typography>
            <Typography variant="body2">{each.note}</Typography>
          </Stack>
        </Stack>
        <Typography>By {each.user}</Typography>
        <Stack direction={"column"} alignItems={"flex-end"}>
          <Typography
            variant="body1"
            color={each.amount > 0 ? "green" : "red"}
            fontWeight="bolder"
            sx={
              each.isFailed
                ? {
                    textDecoration: "line-through",
                  }
                : null
            }
          >
            {Number(each.amount)}
          </Typography>
          <Typography variant="body2">{timeDecider(each.time)}</Typography>
        </Stack>
      </Box>
      <Divider />
    </Box>
  );

export const Home = () => {
  const navigate = useNavigate();
  const {
    activeUser,
    setActiveUser,
    transactionList,
    setTransactionList,
    income,
    expense,
    setIncome,
    setExpense,
  } = useContext(Datacontext);
  useEffect(() => {
    if (activeUser.length === 0) navigate("/login");
  }, []);

  const [incomeisOpen, setIncomeIsOpen] =
    useState<Istate["incomeIsOpen"]>(false);
  const [expenseIsOpen, setExpenseIsOpen] =
    useState<Istate["expenseIsOpen"]>(false);
  const [transaction, setTransaction] = useState<Istate["transaction"]>({
    amount: 0,
    category: "",
    note: "",
    time: "04:55",
    user: activeUser,
    isFailed: false,
  });

  const categoryHandler = (event: SelectChangeEvent<string>) =>
    setTransaction({ ...transaction, category: event.target.value });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction({
      ...transaction,
      [event.target.name]: event.target.value,
      user: activeUser,
    });
  };

  const submission = () => {
    const today = new Date(Date.now());
    if (transaction.amount === 0) {
      alert("Enter Amount");
      return;
    }
    const addedObj = {
      ...transaction,
      amount: incomeisOpen ? transaction.amount : transaction.amount * -1,
      time: new Date(Date.now()).toLocaleString(),
      isFailed: false,
    };
    if (addedObj.amount > 0) {
      setIncome(Number(income) + Number(addedObj.amount));
    } else if (Number(expense) + Number(income) + Number(addedObj.amount) < 0) {
      alert("Your Transaction is Failed Due to Insufficient Funds");
      addedObj.isFailed = true;
    } else {
      setExpense(Number(expense) + Number(addedObj.amount));
    }
    // console.log(addedObj.time);
    setTransactionList([addedObj, ...transactionList]);
    localStorage.setItem(
      "list",
      JSON.stringify([addedObj, ...transactionList])
    );
    // console.log(transaction);
    setTransaction({
      amount: 0,
      category: "",
      note: "",
      time: "04:55",
      user: activeUser,
      isFailed: false,
    });

    setIncomeIsOpen(false);
    setExpenseIsOpen(false);
  };
  return (
    <Paper sx={homeStyles.mainContainer}>
      <Paper sx={homeStyles.navBar}>
        <Menu />
        <Typography variant="h5" sx={homeStyles.titleText}>
          Money Manager
        </Typography>
        <Button>
          <Box component={"span"} sx={homeStyles.bell}>
            Notifications
          </Box>{" "}
          <NotificationsIcon />
        </Button>
      </Paper>
      <Stack sx={homeStyles.bodyContainer} my={5} spacing={3} height={625}>
        <Paper sx={homeStyles.actionsHolder}>
          <Stack direction={"column"}>
            <Typography variant="h5">Account Balance</Typography>
            <Typography variant="h3">RS. {income + expense}</Typography>
          </Stack>
          <Stack sx={homeStyles.mainBtnsHolder}>
            <Stack
              sx={{ ...homeStyles.incomeIcon, ...homeStyles.green }}
              onClick={() => setIncomeIsOpen(true)}
            >
              <Box
                component={"img"}
                src={incomeLogo}
                sx={homeStyles.iconSize}
              />
              <Stack direction={"column"} color={"white"}>
                <Typography variant="subtitle2" sx={homeStyles.incomeFont}>
                  Income
                </Typography>
                <Typography variant="h5" sx={homeStyles.incomeFont}>
                  Rs. {income}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={
                income + expense === 0
                  ? {
                      ...homeStyles.incomeIcon,
                      ...homeStyles.red,
                      ...homeStyles.disabling,
                    }
                  : { ...homeStyles.incomeIcon, ...homeStyles.red }
              }
              onClick={() => {
                if (income + expense !== 0) setExpenseIsOpen(true);
              }}
            >
              <Box
                component={"img"}
                src={expenseLogo}
                sx={homeStyles.iconSize}
              />
              <Stack direction={"column"} color={"white"}>
                <Typography variant="subtitle2" sx={homeStyles.incomeFont}>
                  Expenses
                </Typography>
                <Typography variant="h5" sx={homeStyles.incomeFont}>
                  Rs. {expense * -1}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mt: 2,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Stack direction={"column"} alignItems={"center"}>
              <IncomeChart />
              <Typography variant="h5">Income Pie Chart</Typography>
            </Stack>
            <Stack direction={"column"}>
              <ExpenseChart />
              <Typography variant="h5">Expense Pie Chart</Typography>
            </Stack>
          </Box>
        </Paper>
        <Modal
          open={incomeisOpen}
          onClose={() => setIncomeIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: { md: 200, xs: 50 },
              left: { md: 400, xs: 10 },
              ...homeStyles.modalSettings,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={homeStyles.modalTitle}
            >
              Add Your Income Here
            </Typography>
            <Stack spacing={3} id="modal-modal-description" sx={{ mt: 2 }}>
              <Stack
                direction={"row"}
                width={"175px"}
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography variant="body1">Amount</Typography>
                <TextField
                  type="number"
                  value={transaction.amount}
                  onChange={changeHandler}
                  name="amount"
                />
              </Stack>
              <Stack
                direction={"row"}
                width={"250px"}
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography variant="body1">Category</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="category"
                    onChange={categoryHandler}
                    value={transaction.category}
                  >
                    <MenuItem value={"Salary"}>Salary</MenuItem>
                    <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                    <MenuItem value={"Business"}>Business</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Stack
              mt={2}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Typography variant="body1">Note</Typography>
              <TextField
                variant="outlined"
                type={"text"}
                placeholder="note.."
                name="note"
                onChange={changeHandler}
              />
            </Stack>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ alignSelf: "center", mt: 2 }}
              onClick={submission}
            >
              Add
            </Button>
          </Box>
        </Modal>
        <Modal
          open={expenseIsOpen}
          onClose={() => setExpenseIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: { md: 200, xs: 50 },
              left: { md: 400, xs: 10 },
              ...homeStyles.modalSettings,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={homeStyles.modalExpense}
            >
              Add Your Expense Here
            </Typography>
            <Stack spacing={3} id="modal-modal-description" sx={{ mt: 2 }}>
              <Stack
                direction={"row"}
                width={"175px"}
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography variant="body1">Amount</Typography>
                <TextField
                  type="number"
                  value={transaction.amount}
                  onChange={changeHandler}
                  name="amount"
                />
              </Stack>
              <Stack
                direction={"row"}
                width={"250px"}
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography variant="body1">Category</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="category"
                    onChange={categoryHandler}
                    value={transaction.category}
                  >
                    <MenuItem value={"Shopping"}>Shopping</MenuItem>
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Stack
              mt={2}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Typography variant="body1">Note</Typography>
              <TextField
                variant="outlined"
                type={"text"}
                placeholder="note.."
                name="note"
                onChange={changeHandler}
              />
            </Stack>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ alignSelf: "center", mt: 2 }}
              onClick={submission}
            >
              Add
            </Button>
          </Box>
        </Modal>
        <Paper sx={homeStyles.transactionHolder}>
          <Stack sx={homeStyles.listBar}>
            <Typography variant="h6">Recent Transactions</Typography>
            <Button variant="outlined" onClick={() => navigate("/all")}>
              See All
            </Button>
          </Stack>
          <Stack sx={homeStyles.listItemsContainer}>
            {transactionList
              .slice(0, 5)
              .map((each, index) => eachItem(each, index))}
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  );
};
