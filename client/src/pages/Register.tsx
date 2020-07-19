import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { successRegister, failedRegister } from "../actions/user";
import { Store } from "../store";
import { TContext, TErr } from "../customTypes";
import { Alert } from "../components/Alert";
export const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { dispatch } = useContext(Store) as TContext;
  const [errors, setErrors] = useState<Array<TErr>>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.fullName === "") {
      let rand = ~~(Math.random() * 100);
      let errs = { msg: "Required Field", id: rand };
      setErrors([...errors, errs]);
    }
    if (user.email === "") {
      let rand = ~~(Math.random() * 100);
      let errs = { msg: "Required Field", id: rand };
      setErrors([...errors, errs]);
    }
    let regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!user.email.match(regx)) {
      let rand = ~~(Math.random() * 100);
      let errs = { msg: "Invalid Email", id: rand };
      setErrors([...errors, errs]);
    }
    if (user.password === "") {
      let rand = ~~(Math.random() * 100);
      let errs = { msg: "Required Field", id: rand };
      setErrors([...errors, errs]);
    }
    if (user.password.length < 6) {
      let rand = ~~(Math.random() * 100);
      let errs = {
        id: rand,
        msg: "Password should be at least 6 characters",
      };
      setErrors([...errors, errs]);
    }
    try {
      const { data } = await axios.post("/api/users/register", user);
      console.log(data);
      dispatch(successRegister());
      history.push("/login");
    } catch (error) {
      dispatch(failedRegister());
    }
  };
  return (
    <div className="pt-5">
      <h2 className="display-2 my-4 text-center">Welcome Back</h2>
      {errors.length > 0 &&
        errors.map((error: TErr, idx: number, arr) => (
          <Alert
            key={error.id}
            msg={error.msg}
            removeAlert={() => {
              let newArr = errors.filter((err) => err.id !== error.id);
              setErrors(newArr);
            }}
          />
        ))}
      <form onSubmit={handleRegister} className="py-5 px-5" noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            name="fullName"
            id="name"
            value={user.fullName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Register
        </button>
        <Link className="ml-3 text-info" to="/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};
