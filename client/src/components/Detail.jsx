import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deldata } from "../Context/ContextProvider";

const Detail = () => {
  const navigate = useNavigate();
  const [getuserData, setuserData] = useState([]);
  const { id } = useParams("");
  console.log(getuserData);
  const { dltdata, setDLTdata } = useContext(deldata);
  const getdata = async (e) => {
    const res = await fetch(`https://buddy-book-backend.vercel.app/getSinleUserData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.singleUser);

    setuserData(data);
  };
  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res = await fetch(`https://buddy-book-backend.vercel.app/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setDLTdata(data);

    console.log("data deleted Successfully");
    navigate("/");
  };
  return (
    <>
      <div className="container mt-3">
        <h1 style={{ fontWeight: 400 }}>Welcome Arif</h1>

        <div className="card" style={{ maxWidth: 600, maxHeight: "40rem" }}>
          <div className="card-body">
            <div className="add_btn">
              <Link
                to={`/update/${
                  getuserData.singleUser && getuserData.singleUser._id
                }`}
              >
                <button className="btn btn-primary mx-2">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteuser(
                    `${getuserData.singleUser && getuserData.singleUser._id}`
                  )
                }
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div className="row">
              <div className="left-view col-lg-6 col-md-6 col-12">
                <h5 className="m-4">
                  Name:{" "}
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.name}
                  </span>
                </h5>
                <h5 className="m-4">
                  Age:{" "}
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.age}
                  </span>
                </h5>
                <h5 className="m-4">
                  Email:
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.email}
                  </span>
                </h5>
                <h5 className="m-4">
                  Occupation:{" "}
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.work}
                  </span>
                </h5>
              </div>
              <div className="right-view col-lg-6 col-md-6 col-12">
                <h5 className="m-4">
                  Mobile:{" "}
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.mobile}
                  </span>
                </h5>
                <h5 className="m-4">
                  Location:{" "}
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.add}
                  </span>
                </h5>
                <h5 className="m-4">
                  Description:{" "}
                  <span style={{ fontWeight: 400 }}>
                    {getuserData.singleUser && getuserData.singleUser.desc}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
