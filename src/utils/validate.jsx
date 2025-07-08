export const checkValidEmail = (email) => {
  if (!email) return "Please enter Email";
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  if (!isEmailValid) return "Email Address is not valid";

  return null;
};

export const checkValidPassword = (password) => {
  if (!password) return "Please enter password";
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );

  if (!isPasswordValid)
    return "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character";

  return null;
};