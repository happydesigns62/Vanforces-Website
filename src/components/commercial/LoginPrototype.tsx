"use client";

import { useState, type FormEvent } from "react";
import { DemoNotice } from "@/components/global/Common";

/** Visual prototype only: it doesn't check, store or send credentials. */
export function LoginPrototype() {
  const [tried, setTried] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTried(true);
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="login-company" className="mb-1.5 block text-[14.5px] font-semibold">Company code</label>
        <input id="login-company" className="field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-[14.5px] font-semibold">Email</label>
        <input id="login-email" type="email" className="field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-[14.5px] font-semibold">Password</label>
        <input id="login-password" type="password" className="field" autoComplete="off" />
      </div>
      <button type="submit" className="min-h-12 w-full cursor-pointer rounded-full bg-navy-deep text-[15px] font-semibold text-white transition-colors hover:bg-navy-deep">
        Log in
      </button>
      {tried ? (
        <div role="status">
          <DemoNotice>You weren&apos;t logged in. This page is a visual prototype, so nothing was checked or sent. Please don&apos;t enter real details here.</DemoNotice>
        </div>
      ) : null}
    </form>
  );
}
