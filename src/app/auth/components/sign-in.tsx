"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

import { signIn } from "@/libs/firebase-auth";
import { isStrongPassword, isValidEmail } from "@/app/auth/helpers/email";
import { FirebaseUser } from "@/app/auth/interfaces/firebase-user";
import { friendlyMsg } from "@/app/auth/helpers/messages";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailOK = isValidEmail(email);
  const pwdOK = isStrongPassword(password);
  const isFormComplete = emailOK && pwdOK;

  const handleChange =
    (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError("");
    };

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!email.trim() || !password.trim()) return;

      setLoading(true);

      try {
        const userCredential = await signIn(email, password);
        const user: FirebaseUser = userCredential.user;
        localStorage.setItem("uid", user.uid);

        setEmail("");
        setPassword("");

        router.push("/admin/dashboard");
      } catch (error) {
        const firebaseError = error as FirebaseError;
        setError(friendlyMsg(firebaseError.code));
      } finally {
        setLoading(false);
      }
    },
    [email, password, router]
  );

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-4 p-6">
      <form className="max-w-sm mx-auto" onSubmit={handleSignIn}>
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
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="password"
            name="password"
            onChange={handleChange(setPassword)}
            placeholder="Password (6+ characters)"
            required
            type="password"
          />
        </div>

        {/* Validation message */}
        {error && (
          <p className="text-red-600 text-sm mb-2" aria-live="polite">
            {error}
          </p>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          className="mt-4 text-blue-600 cursor-pointer"
          type="button"
          onClick={() => router.push("/auth/sign-up")}
        >
          Already have an account? Sign up
        </button>
      </form>
    </div>
  );
}
