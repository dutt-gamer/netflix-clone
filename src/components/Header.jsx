import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import {
  DEFAULT_LOGO,
  NETFLIX_LOGO,
  SUPPORTED_LANGUAGES,
} from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch,navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 z-10 flex items-start justify-between">
      <div>
        <img
          className="ml-1 w-32 md:w-44 md:ml-20 cursor-pointer"
          src={NETFLIX_LOGO}
          alt="Netflix"
        />
      </div>
      {user && (
        <div className="flex items-end md:items-center flex-col md:flex-row">
          <div className="flex items-center">
            {showGptSearch && (
              <select
                className="p-1 md:p-2 md:m-2 rounded-md bg-black text-white"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGptSearchClick}
              className="p-1 my-1 mx-2 md:my-2 md:py-2 md:mx-4 bg-purple-800 rounded-md text-white"
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-md  cursor-pointer"
              src={DEFAULT_LOGO}
              alt="user"
            />
          </div>
          <button
            onClick={handleSignOut}
            className="m-2 p-1 md:m-4 hover:border-b hover:border-b-[rgb(229,9,20)] text-[rgb(229,9,20)] transition-colors font-semibold"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;