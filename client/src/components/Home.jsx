import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addata } from "../Context/ContextProvider";
import { updatedata } from "../Context/ContextProvider";
import { deldata } from "../Context/ContextProvider";

// ... (your imports remain the same)

const Home = () => {
  const [getuserData, setuserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const { udata, setUdata } = useContext(addata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
<<<<<<< HEAD
=======
  const getdata = async (e) => {
    const res = await fetch("https://buddy-book-backend.vercel.app/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
>>>>>>> c621c0d771d9061dbb36a0ef52435aba14dc08f1

  const getdata = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8003/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData(data.userdata);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
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

    if (res.status === 400 || !data) {
      console.log("error");
    } else {
      setDLTdata(data);
      console.log("data deleted Successfully");
      getdata();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // If search term is empty, reset search results
      setuserData([]);
      return;
    }

    setLoading(true);

    try {
      const data = await getSearchData();
      console.log("data is", data);
      setuserData(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSearchData = async () => {
    const endpoint = searchTerm.trim()
      ? `http://localhost:8003/${searchTerm}`
      : "http://localhost:8003/getData";

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  };

  console.log("result", getuserData);

  return (
    <>
      {udata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Yepp!</strong> User Added Succesfully.
            <button
              type="button"
              className="btn-close"
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
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Yepp!</strong> User Updated Succesfully.
            <button
              type="button"
              className="btn-close"
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
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Yepp!</strong> User Deleted Succesfully.
            <button
              type="button"
              className="btn-close"
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
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            <Link className="btn btn-outline-primary" to="/create">
              Add
            </Link>
          </form>
          <div className="add_btn mt-2"></div>

          {loading ? (
            <p>Loading...</p>
          ) : getuserData.length > 0 ? (
            <table className="table mt-2">
              <thead>
                <tr className="table-dark">
                  <th scope="col">id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Phone</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {getuserData.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
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
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
