import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidEmail, checkValidPassword } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, DEFAULT_LOGO } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handlebuttonClick = () => {
    //console.log(email.current.value);
    //console.log(password.current.value);
    const errEmail = checkValidEmail(email.current.value);
    const errPassword = checkValidPassword(password.current.value);
    setErrorEmail(errEmail);
    setErrorPassword(errPassword);
    //console.log(message);
    if ((errEmail, errPassword)) return;

    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:DEFAULT_LOGO,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorEmail(errorCode + "-" + errorMessage);
          setErrorPassword(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorEmail(errorCode + "-" + errorMessage);
          setErrorPassword(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <div className="relative w-screen h-screen overflow-hidden">
        <img
          className="object-cover w-full min-h-screen"
          src={BG_URL}
          alt="logo"
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="bg-black/60 p-12 relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-[450px] h-auto md:h-[540px] rounded-md">
            <form
              className="flex flex-col"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="text-3xl font-bold text-white px-2 mb-5">
                {isSignInForm ? "Sign In" : "Sign Up"}
              </h1>
              {!isSignInForm && (
                <input
                  ref={name}
                  className="m-2 p-4 text-white bg-slate-800/40 border border-slate-500 rounded-md"
                  type="text"
                  placeholder="Full name"
                />
              )}
              <input
                ref={email}
                className="m-2 p-4 text-white bg-slate-800/40 border border-slate-500 rounded-md"
                type="text"
                placeholder="Email Address"
              />
              <span className="mx-2 text-[rgb(229,9,20)] font-semibold text-sm">
                {errorEmail}
              </span>
              <div className="relative m-2">
                <input
                  ref={password}
                  className="p-4 w-full text-white bg-slate-800/40 border border-slate-500 rounded-md pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <span className="mx-2 text-[rgb(229,9,20)] font-semibold text-sm">
                {errorPassword}
              </span>
              <button
                className="p-2 m-2 font-bold bg-[rgb(229,9,20)] hover:bg-red-700 transition-colors text-white text-md rounded-md"
                onClick={handlebuttonClick}
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
              <h3
                className={
                  isSignInForm ? "text-slate-300 my-2 text-center" : "hidden"
                }
              >
                OR
              </h3>
              <button
                className={
                  isSignInForm
                    ? "p-2 m-2 font-bold bg-slate-400/35 hover:bg-slate-400/25 transition-colors text-white text-md rounded-md"
                    : "hidden"
                }
              >
                Use a sign-in code
              </button>
              <p className="mx-2 mt-4 text-slate-300">
                {isSignInForm ? "New to Netflix?" : "Already registered?"}
                <b
                  className="text-white hover:underline cursor-pointer"
                  onClick={toggleSignInForm}
                >
                  {isSignInForm ? "Sign Up Now" : "Sign in now"}
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;