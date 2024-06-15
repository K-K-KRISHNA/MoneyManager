import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { allTransactions } from "./Styles";
import React, { useContext, useEffect, useState } from "react";
import Datacontext from "../context/DataContext";
import { eachItem } from "./Home";
import { FcGenericSortingAsc } from "react-icons/fc";
import { FcGenericSortingDesc } from "react-icons/fc";
import { LiaSortAmountDownAltSolid } from "react-icons/lia";
import Filter from "./Filter";

interface Istate {
  filteredUsers: string[];
  earning: number;
  expense: number;
  Newest: boolean | undefined;
  Ascending: undefined | boolean;
  list: string[] | string;
}

export const AllTransactions = () => {
  const [filteredUsers, setFilteredUsers] = useState<Istate["filteredUsers"]>([
    "User 1",
    "User 2",
    "User 3",
  ]);
  let earning: number = 0;
  let expense: number = 0;
  const [Newest, setNewest] = useState<Istate["Newest"]>(true);
  const [Ascending, setAscending] = useState<Istate["Ascending"]>(undefined);
  const [list, setList] = useState<Istate["list"]>([]);
  const { transactionList } = useContext(Datacontext);
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newUsers: string[]
  ) => {
    setFilteredUsers(newUsers);
  };

  const filteredTransactions = transactionList.filter((each) => {
    if (filteredUsers.length === 0 && list.length === 0) {
      return true;
    } else if (filteredUsers.length === 0) {
      return list.includes(each.category);
    } else if (list.length === 0) {
      return filteredUsers.includes(each.user);
    } else {
      return filteredUsers.includes(each.user) && list.includes(each.category);
    }
  });

  // const AscendingList = [...transactionList];

  for (let i = 0; i < filteredTransactions.length; i++) {
    // AscendingList.push(filteredTransactions[i]);
    if (!filteredTransactions[i].isFailed) {
      if (filteredTransactions[i].amount < 0)
        expense += filteredTransactions[i].amount;
      else earning += Number(filteredTransactions[i].amount);
    }
  }

  if (Ascending) {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  } else if (Ascending === false) {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  // if (Ascending === false || Ascending === true) {
  //   AscendingList.sort((a, b) => a.amount - b.amount);
  //   console.log(AscendingList, "ascending");
  // }
  // console.log(list);

  return (
    <Box sx={allTransactions.mainContainer}>
      <Paper sx={allTransactions.innerContainer}>
        <Stack
          sx={allTransactions.header}
          // spacing={2}
          minHeight={"50px"}
          alignItems={"center"}
          mb={4}
        >
          <Typography variant="h4" sx={allTransactions.heading}>
            All Transactions
          </Typography>
          <Stack direction={"row"}>
            <Button
              variant={Newest ? "contained" : "text"}
              onClick={() => {
                setAscending(undefined);
                setNewest(true);
              }}
            >
              Newest
            </Button>
            <Button
              variant={Newest === false ? "contained" : "text"}
              onClick={() => {
                setAscending(undefined);
                setNewest(false);
              }}
            >
              Oldest
            </Button>
          </Stack>
          <Stack direction={"row"}>
            <Button
              startIcon={<FcGenericSortingDesc />}
              size="large"
              variant={Ascending === false ? "contained" : "text"}
              onClick={() => {
                setNewest(undefined);
                setAscending(false);
              }}
            ></Button>
            <Button
              startIcon={<FcGenericSortingAsc color="red" />}
              variant={Ascending === true ? "contained" : "text"}
              onClick={() => {
                setNewest(undefined);
                setAscending(true);
              }}
            ></Button>
          </Stack>
          <Filter setList={setList} />
          <ToggleButtonGroup
            size="small"
            value={filteredUsers}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton value="User 1" aria-label="user1">
              User1
            </ToggleButton>
            <ToggleButton value="User 2" aria-label="user2">
              User2
            </ToggleButton>
            <ToggleButton value="User 3" aria-label="user3">
              User3
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {Newest ? (
          <>
            {" "}
            {filteredTransactions.map((each, index) => eachItem(each, index))}
          </>
        ) : (
          <>
            {" "}
            {filteredTransactions
              .reverse()
              .map((each, index) => eachItem(each, index))}
          </>
        )}
        <Stack sx={allTransactions.footer}>
          <Stack direction={"row"} spacing={4}>
            <Typography variant="h4" sx={{ color: "green" }}>
              <Box component={"span"} sx={{ fontSize: "20px" }}>
                IN.{" "}
              </Box>
              {earning}
            </Typography>
            <Typography variant="h4" sx={{ color: "red" }}>
              <Box component={"span"} sx={{ fontSize: "20px" }}>
                OUT.{" "}
              </Box>
              {expense * -1}
            </Typography>
          </Stack>
          <Typography
            variant="h3"
            sx={earning + expense > 0 ? { color: "green" } : { color: "red" }}
          >
            <Box component={"span"} sx={{ fontSize: "20px" }}>
              NET.{" "}
            </Box>
            Rs. {earning + expense}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};
