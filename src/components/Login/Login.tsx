"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session ? (
        <button className="btn btn-accent" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </button>
      ) : (
        <button className="btn btn-accent" onClick={() => signIn()}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
