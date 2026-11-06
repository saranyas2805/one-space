"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutGrid, LoaderCircle, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signUpError) throw signUpError;
      if (data.session && data.user) {
        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            id: data.user.id,
            email: data.user.email ?? null,
            full_name: fullName.trim(),
          },
          { onConflict: "id" }
        );
        if (profileError) throw profileError;
        router.replace("/");
        router.refresh();
        return;
      }
      setMessage("Account created. Check your email and open the confirmation link to finish signing up.");
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="soft-grid flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/login" className="mb-8 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-slate-950"><LayoutGrid size={22}/></span>
          <span className="text-2xl font-black tracking-tight">one<span className="gradient-text">space</span></span>
        </Link>
        <section className="glass rounded-3xl p-6 shadow-2xl sm:p-8">
          <div className="mb-7 text-center">
            <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/15 text-cyan-200"><Sparkles size={23}/></span>
            <h1 className="text-2xl font-black">Create your space</h1>
            <p className="mt-2 text-sm text-slate-400">One account for everything you want to do.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300">Full name
              <input type="text" required autoComplete="name" maxLength={80} value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60"/>
            </label>
            <label className="block text-sm text-slate-300">Email address
              <input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60"/>
            </label>
            <label className="block text-sm text-slate-300">Password
              <input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60"/>
            </label>
            {error && <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
            {message && <p role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">{message}</p>}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <LoaderCircle size={18} className="animate-spin"/> : <>Create account <ArrowRight size={17}/></>}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">Already have an account? <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">Sign in</Link></p>
        </section>
        <p className="mt-5 text-center text-xs text-slate-600">By joining, you agree to use OneSpace responsibly.</p>
      </div>
    </main>
  );
}
