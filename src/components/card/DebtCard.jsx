import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DebtCard = ({
  id,
  name,
  deadline,
  phone,
  amount,
  children,
  editDebt,
  deleteDebt,
}) => {
  return (
    <div className="alert alert-success d-flex align-items-center justify-content-between">
      <div>
        <h3>
          {name} <span className="badge bg-light
 text-success">{amount} $</span>
        </h3>
        <div>
          <time>{deadline}</time> | <span>{phone}</span>
        </div>
      </div>
      <p>{children.slice(0, 10)}...</p>
      <div>
        <button onClick={() => editDebt(id)} className="btn btn-success me-3">
          Edit ✏️
        </button>
        <button onClick={() => deleteDebt(id)} className="btn btn-danger me-3">
          Delete 🗑
        </button>
        <Link to={`/debts/${id}`} className="btn btn-warning">
          More 📎
        </Link>
      </div>
    </div>
  );
};

DebtCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  deadline: PropTypes.string,
  phone: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.node,
};

export default DebtCard;
