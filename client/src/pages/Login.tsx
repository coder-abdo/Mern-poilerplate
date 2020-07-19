import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Store } from "../store";
import { TContext, TErr } from "../customTypes";
import { Alert } from "../components/Alert";
import { loginSuccess, failedLogin, auth } from "../actions/user";
export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState<Array<TErr>>([]);
  const { dispatch, state } = useContext(Store) as TContext | any;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!user.email) {
      let errors = { msg: "Required Field", id: ~~(Math.random() * 100) };
      setErr([...err, errors]);
      if (!user.email.match(regx)) {
        let errors = { msg: "Invalid Email", id: ~~(Math.random() * 100) };
        setErr([...err, errors]);
      }
    }
    if (!user.password) {
      let errors = { msg: "Required Field", id: ~~(Math.random() * 100) };
      setErr([...err, errors]);
      if (user.password.length < 6) {
        let errors = {
          id: ~~(Math.random() * 100),
          msg: "Password should be at least 6 characters",
        };
        setErr([...err, errors]);
      }
    }
    try {
      const { data } = await axios.post("/api/users/login", user);
      console.log(data);
      dispatch(loginSuccess(data.isAuth));
      if (data.success) {
        const { data: authData } = await axios.get("/api/users/auth");
        console.log(authData);
        dispatch(auth(authData));
      }
    } catch (error) {
      dispatch(failedLogin());
      setErr([
        ...err,
        { msg: error.response.data.error, id: ~~(Math.random() * 100) },
      ]);
    }
  };
  if (state.isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="pt-5">
      <h2 className="display-2 my-4 text-center">Welcome Back</h2>
      {err.length > 0 &&
        err.map((error: TErr, idx: number, arr) => (
          <Alert
            key={error.id}
            msg={error.msg}
            removeAlert={() => {
              let newArr = err.filter((err) => err.id !== error.id);
              setErr(newArr);
            }}
          />
        ))}
      <form onSubmit={handleSubmit} className="py-5 px-5" noValidate>
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
          login
        </button>
        <Link className="ml-3 text-info" to="/register">
          Haven't Yet An Account?
        </Link>
      </form>
    </div>
  );
};
