import { useEffect, useRef } from "react";

function Input(props) {
  if (props.type === "Password") {
    return (
      <div className="input-wrapper input-wrapper-password">
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeHolder}
        />
        <i className="fa fa-eye-slash" onClick={props.togglePassword}></i>
      </div>
    );
  } else {
    return (
      <div className="input-wrapper">
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeHolder}
        />
      </div>
    );
  }
}

function Login() {
  function handleLogin(e) {
    e.preventDefault();
    const url = "http://localhost:3001/testusers";
    const username = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const loginMsg = document.getElementById("loginMsg");
    const currentUser = { username, password };

    var isLoggedIn = false;

    loginMsg.className = "validation-msg";

    if (!username && !password) {
      loginMsg.classList.add("error");
      loginMsg.textContent = "Both fields are required.";
      return;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (JSON.stringify(data[i]) === JSON.stringify(currentUser)) {
            loginMsg.classList.add("success");
            loginMsg.textContent = "you'll be logged in.";
            break;
          } else {
            loginMsg.classList.add("error");
            loginMsg.textContent = "Incorrect credentials.";
          }
        }
      });
  }

  function togglePassword(e) {
    let wrapper = e.target.offsetParent,
      field = wrapper.querySelector("input"),
      icon = e.target,
      type = field.type === "password" ? "text" : "password",
      iconClass = field.type === "password" ? "fa fa-eye" : "fa fa-eye-slash";

    console.log(field.type);

    field.type = type;
    icon.className = iconClass;
  }

  return (
    <div className="login-box">
      <h4>Login</h4>
      <form id="loginForm" onSubmit={handleLogin}>
        <span id="loginMsg" className="validation-msg"></span>
        <Input type="text" name="Email" id="Email" placeHolder="Username" />
        <Input
          type="Password"
          name="Password"
          id="Password"
          placeHolder="******"
          togglePassword={togglePassword}
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
