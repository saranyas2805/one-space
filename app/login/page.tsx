"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutGrid, LoaderCircle, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="soft-grid flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-slate-950"><LayoutGrid size={22}/></span>
          <span className="text-2xl font-black tracking-tight">one<span className="gradient-text">space</span></span>
        </Link>
        <section className="glass rounded-3xl p-6 shadow-2xl sm:p-8">
          <div className="mb-7 text-center">
            <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/15 text-violet-200"><ShieldCheck size={23}/></span>
            <h1 className="text-2xl font-black">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">Sign in to continue to your OneSpace.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300">Email address
              <input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60"/>
            </label>
            <label className="block text-sm text-slate-300">Password
              <input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60"/>
            </label>
            {error && <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <LoaderCircle size={18} className="animate-spin"/> : <>Sign in <ArrowRight size={17}/></>}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">New to OneSpace? <Link href="/signup" className="font-semibold text-cyan-300 hover:text-cyan-200">Create an account</Link></p>
        </section>
        <p className="mt-5 text-center text-xs text-slate-600">Your account is protected with secure authentication.</p>
      </div>
    </main>
  );
}
