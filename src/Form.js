import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [ownerName, setOwnerName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [auth, setAuth] = useState("");
  const [cvvValidationMethod, setcvvValidationMethod] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (!auth) {
      return;
    }
    axios
      .post("/payment", {
        ownerName,
        cardNo,
        expDate,
        cvv,
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (cardNo && cardNo.toString().length !== 16) {
      setAuth("card number should be 16 digits");
    }
    if (cardNo && cardNo.toString().length === 16) {
      setAuth("");
    }
  }, [cardNo]);

  useEffect(() => {
    if (cvv && cvv.toString().length !== 3) {
      setcvvValidationMethod("card number should be 3 digits");
    }
    if (cvv && cvv.toString().length === 3) {
      setcvvValidationMethod("");
    }
  }, [cvv]);

  return (
    <>
      <div className="payment-form">
        <form>
          <h2>Payment Details</h2>
          <img src="logo2.jpg" alt="bank"></img>
          <img src="logo.jpg" alt="bank"></img>
          <hr />
          <div className="form-group">
            <input
              type="text"
              className="form-two-control"
              name="name"
              placeholder="Name of the Account holder"
              required="required"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-two-control"
              name="card number"
              placeholder="Card number"
              required="required"
              onChange={(e) => setCardNo(e.target.value)}
            />
          </div>
          {auth}
          <div className="form-group">
            <input
              type="text"
              className="form-two-control"
              name="EXP_Date"
              placeholder="Expiry Date MM/YY"
              required="required"
              onChange={(e) => setExpDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-two-control"
              name="cvv"
              placeholder="CVV"
              required="required"
              onChange={(e) => setCvv(e.target.value)}
            />
            {cvvValidationMethod}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={handleClick}
            >
              PAY
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
