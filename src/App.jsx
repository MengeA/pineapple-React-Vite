import Logo from "./assets/logo_pineapple.png"
import './App.css';
import { useEffect, useState } from "react";
import Success from "./assets/ic_success.png"

function App() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (email.lenght === 0 && submit) {
      setErrorMsg("Email address is required");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg("Please provide a valid e-mail address")
    } else if (email.split(".").pop() === "co") {
      setErrorMsg("We are not accepting subscriptions from Colombia emails")
    } else if (!isTermsAccepted) {
      setErrorMsg("You must accept the terms and conditions")
    } else {
      setErrorMsg(null)
    }
  }, [email, isTermsAccepted, submit]);

  const handleChange = (event) => setEmail(event.target.value);
  const handleTermsChange = () => setIsTermsAccepted((prev) => !prev);
  const submitForm = () => errorMsg === null && setSubmit((prev) => !prev);

  const SocialIcons = () => (
    <div className="social-icons">
      {["facebook-f", "instagram", "twitter", "youtube"].map((platform) => (
        <div key={platform} className={`icon-container ${platform}`}>
          <i className={`fab fa-2x fa-${platform}`}></i>
        </div>
      ))}
    </div>
  );
  return (
    <div className="App">
      <div className="content">
        <header className="flex-container">
          <a href="#" className="logo-title-wrap">
            <img src={Logo} className="logo"></img>
            <p className="title">pineapple.</p>
          </a>
          <nav>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">How it works</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          {submit === true ? (
            <div>
              <div className="container">
                <div className="main-section">
                  <img src={Success} className="success-img" />
                  <h1> Thanks for subscribing!</h1>
                  <p>You have successfully subscribed to our email listing. Check your email for the discount code
                  </p>
                  <SocialIcons />
                </div>
              </div>
            </div>
          ) : (
            <div className="main-section">
              <h1>Subscribe to newsletter</h1>
              <p>Subscribe to our newsletter and get 10% discount on pineapple glasses.</p>
              <div className={` input-section ${errorMsg && inputFocused ? "red-border" : ""}` } >
                <input
                  className= {`input-field ${errorMsg && inputFocused ? "red-input" : ""}` }
                  type="text"
                  placeholder="Type your email address here..."
                  value={email}
                  onChange={handleChange}
                  onInput={() => setInputFocused(true)}>
                </input>
                <span onClick={submitForm}>
                  <i className='fas fa-arrow-right'></i>
                </span>
              </div>
              <div>
                {inputFocused && errorMsg && (
                  <p className="error-message">{errorMsg}</p>
                )}
              </div>
              <div className="terms-section">
                <input type="checkbox"
                  className="checkbox"
                  value={isTermsAccepted}
                  onClick={handleTermsChange}>
                </input>
                <p> I agree to <strong>terms of service</strong>
                </p>
              </div>
              <SocialIcons />
            </div>
          )}
        </main>
      </div>
      <div className="right-side">
      </div>
    </div>
  );
}

export default App;