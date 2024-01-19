import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addata } from "../Context/ContextProvider";
const Create = () => {
  const { udata, setUdata } = useContext(addata);
  const navigate = useNavigate();
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

  const addingdata = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, add, desc } = inpval;
    const res = await fetch("https://buddy-book-backend.vercel.app/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        add,
        mobile,
        desc,
        age,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      alert("error");
      console.log("error");
    } else {
      //alert("data added");
      setUdata(data);
      console.log("data added");

      navigate("/");
    }
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
              onClick={addingdata}
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

export default Create;
