import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../../firebase";
import firebase from "firebase/compat";

export const RentHome = () => {
  const [number, setNumber] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [payAmount, setpayAmount] = useState("");
  const [leftAmount, setleftAmount] = useState("");
  const { currentUser } = useAuth();
  const [rentData, setrentData] = useState([]);

  useEffect(() => {
    if (
      rentData.length === 0 &&
      currentUser != "undefined" &&
      currentUser != null
    ) {
      db.collection("rent")
        .where("uid", "==", currentUser.uid)
        .onSnapshot((snapshot) => {
          setrentData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              rentinfo: doc.data(),
            }))
          );
        });
    }
  }, [rentData, currentUser]);

  console.log("rentData : " + JSON.stringify(rentData));

  const handelSubmitRent = (e) => {
    e.preventDefault();

    let rentData = {
      number: number,
      fromDate: fromDate,
      toDate: toDate,
      payAmount: payAmount,
      leftAmount: leftAmount,
      totalAmount: payAmount - leftAmount,
      uid: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("rent")
      .add(rentData)
      .then(
        setNumber(""),
        setfromDate(""),
        settoDate(""),
        setpayAmount(""),
        setleftAmount("")
      );
  };

  return (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center ">
          <div className="section-title">
            <span>Rent</span>
            <h2 className="text-center"> Rent </h2>
          </div>
          <div className="col-md-6">
            <form className="shadow p-4 mt-2">
              <div className="form-group row">
                <div className="form-group">
                  <label for="exampleFormControlSelect1">Select Number</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setfromDate(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => settoDate(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="">Pay amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={payAmount}
                    onChange={(e) => setpayAmount(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="">left amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={leftAmount}
                    onChange={(e) => setleftAmount(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="">Total amount</label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    value={payAmount - leftAmount}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 my-3"
                onClick={handelSubmitRent}
              >
                Submit
              </button>

              {/* <div className="d-flex justify-content-center links">
                Already have account? &nbsp;<a href="/login"> Sign in</a>
              </div> */}
            </form>
          </div>
          <div className="shadow col-md-6">
            <h5 className="text-center mt-2 p-3"> All Rent Information </h5>
            <table className="table">
              <tr>
                <th> No </th>
                <th> From Date</th>
                <th> To Date</th>
                <th> Pay</th>
                <th> Left</th>
                <th> Total</th>
              </tr>
              {rentData && rentData.length > 0
                ? rentData
                    .sort((a, b) => a.rentinfo.timestamp - b.rentinfo.timestamp)
                    .map((data) => {
                      return (
                        <tr>
                          {/* <h2> {data.id}</h2> */}
                          <td>
                            <b> {data.rentinfo.number} </b>
                          </td>
                          <td> {data.rentinfo.fromDate}</td>
                          <td> {data.rentinfo.toDate}</td>
                          <td> {data.rentinfo.payAmount}</td>
                          <td> {data.rentinfo.leftAmount}</td>
                          <td> {data.rentinfo.totalAmount}</td>
                        </tr>
                      );
                    })
                : ""}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
