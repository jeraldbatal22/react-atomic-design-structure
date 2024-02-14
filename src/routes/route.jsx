// import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";

const Authmiddleware = (props) => {
  const role = "admin";
  const isAuthenticated = false;

  if (isAuthenticated) {
    if (role === props.role) { // Checking currnet login role and rederict to authorized pages based on the current role
      return (
        <Fragment>
          {props.children}
        </Fragment>
      )
    } else {
      return <Navigate to="/401" />
    }
  } else {
    return <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  }
};

export default Authmiddleware;
