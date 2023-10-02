import { useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import LoginPage from "./pages/LoginPage";
import DebtsPage from "./pages/DebtsPage";
import TransactionPage from "./pages/TransactionPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout";
import DebtPage from "./pages/DebtPage";

import { DEBTS } from "./constants";

function App() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [debt, setDebt] = useState({
    name: "",
    phone: "",
    amount: "",
    deadline: "",
    description: "",
  });
  const [debts, setDebts] = useState(
    JSON.parse(localStorage.getItem(DEBTS)) || [
      {
        id: "1",
        name: "Doniyor",
        deadline: "2023-09-27",
        amount: 1000,
        phone: "99880380401",
        description: "Aniq va'da beraman ",
      },
      {
        id: "2",
        name: "Aziz",
        deadline: "2024-12-02",
        amount: 2000,
        phone: "99898987645",
        description: " Aniq va'da beraman !",
      },
      {
        id: "3",
        name: "Ibrohim",
        deadline: "2024-03-05",
        amount: 1500,
        phone: "9980902325",
        description: "Aniq va'da beraman",
      },
    ]
  );
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  const handleClose = () => {
    searchRef.current.focus();
    console.log(searchRef);
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setDebt({
      name: "",
      phone: "",
      amount: "",
      deadline: "",
      description: "",
    });
    setSelected(null);
  };

  const handleDebt = (e) => {
    setDebt({ ...debt, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      let newDebts;
      let newDebt = { ...debt, amount: +debt.amount, id: v4() };
      if (selected === null) {
        newDebts = [...debts, newDebt];
        toast.success("successfully");
      } else {
        newDebts = debts.map((debt) => {
          if (debt.id === selected) {
            return newDebt;
          } else {
            return debt;
          }
        });
        toast.success("Edited successfully");
      }
      localStorage.setItem(DEBTS, JSON.stringify(newDebts));
      setDebts(newDebts);
      handleClose();
    } else {
      setValidated(true);
    }
  };

  const editDebt = (id) => {
    let debt = debts.find((debt) => debt.id === id);
    setSelected(id);
    setDebt(debt);
    setShow(true);
  };

  const deleteDebt = (id) => {
    let checkDelete = window.confirm("delete this debt ?");
    if (checkDelete) {
      let newDebts = debts.filter((debt) => debt.id !== id);
      localStorage.setItem(DEBTS, JSON.stringify(newDebts));
      setDebts(newDebts);
      toast.success("Deleted");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.trim().toLowerCase());
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="home" element={<HomePage debts={debts} />} />
          <Route
            path="debts"
            element={
              <DebtsPage
                debt={debt}
                debts={debts}
                show={show}
                validated={validated}
                selected={selected}
                search={search}
                handleClose={handleClose}
                handleShow={handleShow}
                handleSubmit={handleSubmit}
                handleDebt={handleDebt}
                editDebt={editDebt}
                deleteDebt={deleteDebt}
                handleSearch={handleSearch}
                ref={searchRef}
              />
            }
          />
          <Route path="debts/:debtId" element={<DebtPage debts={debts} />} />
          <Route path="transaction" element={<TransactionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
