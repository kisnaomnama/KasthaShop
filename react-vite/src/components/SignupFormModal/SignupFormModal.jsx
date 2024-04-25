import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="form-container sign-up">
    <h1 className="form-header">Sign Up</h1>
    {errors.server && <p>{errors.server}</p>}
    <form className="signup-form form" onSubmit={handleSubmit}>
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
      <div className="error-div">
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <label htmlFor="username" className="form-label">
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-input"
        />
      </label>
      <div className="error-div">
        {errors.username && <div className="error-message">{errors.username}</div>}
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
      <div className="error-div">
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>
      <label htmlFor="confirmPassword" className="form-label">
        Confirm Password:
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="form-input"
        />
      </label>
      <div className="error-div">
        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
      </div>
      <button type="submit" className="submit-button">Sign Up</button>
    </form>
  </div>
  );
}

export default SignupFormModal;
