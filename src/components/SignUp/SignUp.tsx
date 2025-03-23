"use client";
import registerUsers from "@/app/actions/auth/registerUsers";
import React from "react";

const SignUp = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const payload = { email, password };

    console.log(JSON.stringify(payload));
    const result = await registerUsers(payload);
    console.log(result);
    e.preventDefault();
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Effortlessly manage your to-dos, track your progress, and keep your
            goals in check. Whether you&apos;re working on personal projects or
            managing a team, our intuitive task manager helps you stay organized
            and productive.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <input
                type="submit"
                value="Register"
                className="btn btn-neutral mt-4"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
