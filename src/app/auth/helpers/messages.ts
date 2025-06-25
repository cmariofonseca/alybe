export const friendlyMsg = (code: string) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account with that email";
    case "auth/wrong-password":
      return "Incorrect password";
    default:
      return "Unexpected error. Try again";
  }
};
