"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

import { signUp } from "@/libs/firebase-auth";
import { isStrongPassword, isValidEmail } from "@/app/auth/helpers/email";
import { friendlyMsg } from "@/app/auth/helpers/messages";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailOK = isValidEmail(email);
  const pwdOK = isStrongPassword(password);
  const passwordsMatch = password === repeatPassword;
  const isFormComplete = emailOK && pwdOK && repeatPassword && passwordsMatch;

  const handleChange =
    (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError("");
    };

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (!passwordsMatch) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      try {
        await signUp(email, password);
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        router.push("/admin/dashboard");
      } catch (error) {
        const firebaseError = error as FirebaseError;
        setError(friendlyMsg(firebaseError.code));
      } finally {
        setLoading(false);
      }
    },
    [email, password, repeatPassword, router]
  );

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-4 p-6">
      <form className="max-w-sm mx-auto" onSubmit={handleSignUp}>
        {/* Email */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="email"
          >
            Your email
          </label>
          <input
            autoComplete="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="email"
            name="email"
            onChange={handleChange(setEmail)}
            placeholder="name@mail.com"
            required
            type="email"
          />
          {!emailOK && email && <p className="text-red-600 text-sm mt-1">Invalid email format</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="password"
          >
            Your password
          </label>
          <input
            autoComplete="new-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="password"
            name="password"
            onChange={handleChange(setPassword)}
            placeholder="Password (6+ characters)"
            required
            type="password"
          />
        </div>

        {/* Repeat password */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="repeat-password"
          >
            Repeat password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="repeat-password"
            onChange={handleChange(setRepeatPassword)}
            placeholder="Password (6+ characters)"
            required
            type="password"
          />
        </div>

        {/* Validation messages */}
        {!passwordsMatch && repeatPassword && (
          <p className="text-red-600 text-sm mb-2">Passwords do not match</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mb-2" aria-live="polite">
            {error}
          </p>
        )}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        {/* Submit Button */}
        <button
          className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-4 
            ${
              isFormComplete
                ? "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-400 dark:bg-gray-500 cursor-not-allowed"
            }`}
          disabled={!isFormComplete || loading}
          type="submit"
        >
          {loading ? "Creating user..." : "Create Account"}
        </button>

        <button
          className="mt-4 text-blue-600 cursor-pointer"
          onClick={() => router.push("/auth/sign-in")}
          type="button"
        >
          Already have an account? Sign in
        </button>
      </form>
    </div>
  );
}
