import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addata } from "../Context/ContextProvider";
import { updatedata } from "../Context/ContextProvider";
import { deldata } from "../Context/ContextProvider";
const Home = () => {
  const [getuserData, setuserData] = useState([]);
  console.log(getuserData);
  const { udata, setUdata } = useContext(addata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
  const getdata = async (e) => {
    const res = await fetch("https://buddy-book-backend.vercel.app/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    // if (res.status == 400 || !data.userdata) {
    //   console.log("error");
    // } else {
    setuserData(data.userdata);
    console.log("get data ");
    // }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res = await fetch(`https://buddy-book-server.vercel.app/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("error");
    } else {
      setDLTdata(data);
      console.log("data deleted Successfully");
      getdata();
    }
  };

  return (
    <>
      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Yepp!</strong> User Added Succesfully.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Yepp!</strong> User Updated Succesfully.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Yepp!</strong> User Deleted Succesfully.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <Link className="btn btn-primary" to="/create">
              Add
            </Link>
          </div>

          <table className="table mt-2">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserData.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td className="d-flex justify-content-between">
                    <Link to={`view/${user._id}`}>
                      <button className="btn btn-success">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </button>
                    </Link>
                    <Link to={`/update/${user._id}`}>
                      <button className="btn btn-primary">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => deleteuser(`${user._id}`)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
