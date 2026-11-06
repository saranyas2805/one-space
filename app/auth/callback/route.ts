import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const requestedNext = request.nextUrl.searchParams.get("next");
  const nextPath =
    requestedNext && requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_confirmation_code", request.url));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login?error=confirmation_failed", request.url));
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (user) {
    const fullName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null;
    const { error: profileError } = await supabase.from("profiles").upsert(
      { id: user.id, email: user.email ?? null, full_name: fullName },
      { onConflict: "id" }
    );
    if (profileError) {
      return NextResponse.redirect(new URL("/login?error=profile_setup_failed", request.url));
    }
  }

  return NextResponse.redirect(new URL(nextPath, request.url));
}
