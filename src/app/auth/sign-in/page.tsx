import { Metadata } from "next";

import SignIn from "@/app/auth/components/sign-in";

export const metadata: Metadata = {
  title: "Add Flashcard",
  description:
    "Create new English vocabulary flashcards by entering a word, its meaning or image, and pronunciation to expand your learning library.",
};

export default function SignInPage() {
  return (
    <main className="w-full flex justify-center items-center min-h-screen">
      <SignIn />
    </main>
  );
}
