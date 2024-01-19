import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updatedata } from "../Context/ContextProvider";

const Update = () => {
  const navigate = useNavigate();
  const { updata, setUPdata } = useContext(updatedata);
  const [inpval, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });
  const setdata = (e) => {
    const { name, value } = e.target;
    setInp((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const { id } = useParams("");

  const getdata = async (e) => {
    const res = await fetch(`http://localhost:8003/getSinleUserData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.singleUser);

    setInp(data.singleUser);
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    const { name, age, email, work, mobile, add, desc } = inpval;

    const res = await fetch(`http://localhost:8003/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, email, work, mobile, add, desc }),
    });
    const data = await res.json();
    console.log(data);

    //alert("data updated");
    setUPdata(data);
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <Link to="/">Home</Link>

        <form className="mt-5">
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={inpval.name}
                onChange={setdata}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3  col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={setdata}
                value={inpval.email}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3  col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Age
              </label>
              <input
                type="text"
                name="age"
                onChange={setdata}
                value={inpval.age}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                onChange={setdata}
                value={inpval.mobile}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Work
              </label>
              <input
                type="text"
                name="work"
                onChange={setdata}
                value={inpval.work}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="add"
                onChange={setdata}
                value={inpval.add}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <textarea
                name="desc"
                value={inpval.desc}
                onChange={setdata}
                className="form-control"
                cols="30"
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              onClick={updateUser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
