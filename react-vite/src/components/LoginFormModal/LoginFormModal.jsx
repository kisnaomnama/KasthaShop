import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  function loginDemo(){
    // console.log('login as demo')
    const email = "tom@aa.io";
    const password = "password";
    closeModal()
    dispatch(
      thunkLogin({
      email,
      password,
    })
  )
  }

  return (
    <div className="form-container login">
    <h1 className ="form-header">Log In</h1>
    <form className="login-form form" onSubmit={handleSubmit}>
      <label htmlFor="email" className="form-label">
        Email:
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </label>
      <div className = 'error-div'>
      {errors.email && <div className="error-message">{errors.email}</div>}
      </div>  
      <label htmlFor="password" className="form-label">
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </label>
      <div className = 'error-div'>
      {errors.password && <div className="error-message">{errors.password}</div>}
      </div>
      <button type="submit" className="submit-button">Log In</button>
      <button onClick={loginDemo}>Login as Demo-user</button>
    </form>
  </div>
  
  );
}

export default LoginFormModal;
