import { Metadata } from "next";

import SignUp from "@/app/auth/components/sign-up";

export const metadata: Metadata = {
  title: "Add Flashcard",
  description:
    "Create new English vocabulary flashcards by entering a word, its meaning or image, and pronunciation to expand your learning library.",
};

export default function SignUpPage() {
  return (
    <main className="w-full flex justify-center items-center min-h-screen">
      <SignUp />
    </main>
  );
}
