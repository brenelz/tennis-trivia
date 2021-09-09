import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { signIn } from "../lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      router.push("/game");
    }
  }, [router]);

  return (
    <>
      <button
        autoFocus
        onClick={signIn}
        className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
      >
        Login to Play
      </button>
    </>
  );
}
