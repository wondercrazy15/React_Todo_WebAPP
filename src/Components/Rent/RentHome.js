import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../../firebase";
import firebase from "firebase/compat";
import DataTable from "react-data-table-component";

export const RentHome = () => {
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [payAmount, setpayAmount] = useState("");
  const [leftAmount, setleftAmount] = useState("");
  const { currentUser } = useAuth();
  const [rentData, setrentData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [search, setsearch] = useState("");
  const inputName = useRef();
  const [searchDate, setsearchDate] = useState("");

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
      name: name,
      desc: desc,
      fromDate: fromDate,
      toDate: toDate,
      payAmount: payAmount,
      leftAmount: leftAmount,
      totalAmount: payAmount - leftAmount,
      uid: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (edit == true) {
      //console.log(edit);
      db.collection("rent").doc(editID).set(rentData);
      setEdit(false);
    } else {
      db.collection("rent").add(rentData);
    }

    setname("");
    setdesc("");
    setfromDate("");
    settoDate("");
    setpayAmount("");
    setleftAmount("");
  };

  const editData = (rentinfo, id) => {
    setname(rentinfo.name);
    setdesc(rentinfo.desc);
    setfromDate(rentinfo.fromDate);
    settoDate(rentinfo.toDate);
    setpayAmount(rentinfo.payAmount);
    setleftAmount(rentinfo.leftAmount);
    setEditID(id);
    setEdit(true);
    inputName.current.focus();
  };
  const serach = (data) => {
    debugger;
    rentData.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(data.toLowerCase())
    );
    setrentData([...rentData, rentData]);
  };

  // const columns = [
  //   // {
  //   //   name: <h5></h5>,
  //   //   selector: (row) => row.UploadImage,
  //   //   cell: (row) =>
  //   //     row.UploadImage ? (
  //   //       <img
  //   //         height="84px"
  //   //         width="56px"
  //   //         alt={row.name}
  //   //         src={row.UploadImage}
  //   //       />
  //   //     ) : (
  //   //       <img height="84px" width="56px" alt={row.name} src={usersolid} />
  //   //     ),
  //   // },
  //   {
  //     name: <h5>Name</h5>,
  //     selector: (row) => row.name,
  //   },
  //   {
  //     name: <h5>Description</h5>,
  //     selector: (row) => row.desc,
  //   },
  //   {
  //     name: <h5>From Date</h5>,
  //     selector: (row) => row.fromDate,
  //   },

  //   {
  //     name: <h5>To Date</h5>,
  //     selector: (row) => row.toDate,
  //   },
  //   {
  //     name: <h5>Pay Amount</h5>,
  //     selector: (row) => row.payAmount,
  //   },
  //   {
  //     name: <h5>Left Amount</h5>,
  //     selector: (row) => row.leftAmount,
  //   },
  // ];

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
                <div className="form-gorup">
                  <label for="exampleFormControlSelect1"> Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    ref={inputName}
                    autoFocus
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="form-gorup mt-3">
                  <label for="exampleFormControlSelect1"> Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="desc"
                    rows="3"
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                  ></textarea>
                </div>
                {/* <div className="form-group">
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
                </div> */}
                <div className="col-auto form-gorup mt-3">
                  <label htmlFor="">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setfromDate(e.target.value)}
                  />
                </div>
                <div className="col-auto form-gorup mt-3">
                  <label htmlFor="">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => settoDate(e.target.value)}
                  />
                </div>
                <div className="col-auto form-gorup mt-3">
                  <label htmlFor="">Pay amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={payAmount}
                    onChange={(e) => setpayAmount(e.target.value)}
                  />
                </div>
                <div className="col-auto form-gorup mt-3">
                  <label htmlFor="">left amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={leftAmount}
                    onChange={(e) => setleftAmount(e.target.value)}
                  />
                </div>
                <div className="col-auto form-gorup mt-3">
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
            <div className="form-group row">
              <div className="form-gorup d-flex justify-content-end col-md-3">
                <label for="Search"> Search</label>
                <input
                  type="text"
                  className="form-control ml-2"
                  id="Search"
                  autoFocus
                  value={search}
                  //onChange={(e) => setsearch(e.target.value)}
                  onChange={(e) => serach(e.target.value)}
                />
              </div>
            </div>
            {/* <DataTable
              columns={columns}
              data={rentData}
              pagination
              defaultSortFieldId={2}
              className="shadow"
            /> */}
            <table className="table" data={rentData}>
              <tr>
                <th> Name </th>
                <th> Description </th>
                <th> From Date</th>
                <th> To Date</th>
                <th> Pay</th>
                <th> Left</th>
                <th> Total</th>
                <th> Edit / Delete</th>
              </tr>
              {rentData && rentData.length > 0
                ? rentData
                    .sort((a, b) => a.rentinfo.timestamp - b.rentinfo.timestamp)
                    .map((data) => {
                      return (
                        <tr>
                          {/* <h2> {data.id}</h2> */}
                          <td>
                            <b> {data.rentinfo.name} </b>
                          </td>
                          <td> {data.rentinfo.desc}</td>
                          <td> {data.rentinfo.fromDate}</td>
                          <td> {data.rentinfo.toDate}</td>
                          <td> {data.rentinfo.payAmount}</td>
                          <td> {data.rentinfo.leftAmount}</td>
                          <td> {data.rentinfo.totalAmount}</td>

                          {/* <td>
                            <input
                              type="date"
                              // value={
                              //   new Datedata.rentinfo.timestamp()
                              //     ? ""
                              //     : searchDate
                              // }
                              onchange={(e) =>
                                setsearchDate(
                                  data.rentinfo.timestamp ? "" : searchDate
                                )
                              }
                            />
                            {/* {data.rentinfo.timestamp} */}
                          {/* </td> */}
                          <button
                            type="button"
                            className="btn btn-sm btn-success mt-2"
                            onClick={() => {
                              editData(data.rentinfo, data.id);
                            }}
                          >
                            <i class="fas fa-edit p-0"></i>
                          </button>

                          <button
                            disabled={edit}
                            type="button"
                            className="btn btn-sm btn-danger ml-2 p-0 mt-2"
                            onClick={(event) =>
                              db.collection("rent").doc(data.id).delete()
                            }
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
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
