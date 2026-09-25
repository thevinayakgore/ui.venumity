"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Mail,
  Lock,
  EyeOff,
  Github,
  Chrome,
  Loader2,
  ArrowRight,
} from "lucide-react";

interface StandardSignInProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => Promise<void> | void;
  onGoogleSignIn?: () => void;
  onGithubSignIn?: () => void;
  isLoading?: boolean;
  error?: string | null;
  signUpHref?: string;
  forgotPasswordHref?: string;
}

export default function StandardSignIn({
  onSubmit,
  onGoogleSignIn,
  onGithubSignIn,
  isLoading = false,
  error,
  signUpHref = "/sign-up",
  forgotPasswordHref = "/forgot-password",
}: StandardSignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isBusy = isLoading || submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isBusy) return;

    setSubmitting(true);
    try {
      await onSubmit({ email, password, remember });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5 md:p-10 w-full">
      {/* Card */}
      <div className="p-0.5 bg-linear-to-tl from-primary via-transparent to-blue-500 rounded-2xl overflow-hidden max-w-md m-auto w-full">
        <div className="relative p-5 sm:p-10 bg-background rounded-[1.1rem] rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden w-full">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 size-60 bg-primary/40 rounded-full blur-[6rem] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-60 bg-blue-500/40 rounded-full blur-[6rem] pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col items-start gap-2 mb-6">
              <span className="text-sm opacity-50">Welcome back</span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-foreground/50">
                Enter your credentials to continue
              </p>
            </div>

            {/* Social Sign-in */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <Button
                type="button"
                variant="outline"
                onClick={onGoogleSignIn}
                disabled={isBusy}
                className="gap-2 bg-background! border-foreground/15! shadow-none h-10 rounded-lg"
              >
                <Chrome className="size-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onGithubSignIn}
                disabled={isBusy}
                className="gap-2 bg-background! border-foreground/15! shadow-none h-10 rounded-lg"
              >
                <Github className="size-4" />
                GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center my-5">
              <Separator className="flex-1" />
              <span className="px-3 text-xs text-foreground/50 font-medium">
                OR
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/50 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isBusy}
                    autoComplete="email"
                    className="pl-9 bg-background! border-foreground/15! shadow-none h-10 rounded-lg"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href={forgotPasswordHref}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/50 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isBusy}
                    autoComplete="current-password"
                    className="pl-9 pr-9 bg-background! border-foreground/15! shadow-none h-10 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={isBusy}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(!!v)}
                  disabled={isBusy}
                  className="bg-background! data-checked:bg-foreground! border-foreground/20! shadow-none"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-foreground/60 cursor-pointer"
                >
                  Remember me for 30 days
                </Label>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-sm text-rose-600"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isBusy}
                className="p-6! gap-2 group bg-transparent! bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 text-white! font-semibold rounded-lg w-full"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-5 group-hover:translate-x-3 transition-all duration-500" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-foreground/60">
              Don&apos;t have an account ?{" "}
              <Link
                href={signUpHref}
                className="text-primary font-semibold hover:underline"
              >
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <p className="mt-4 text-xs text-center text-foreground/50 max-w-sm mx-auto">
        By signing in, you agree to our{" "}
        <Link href="/legal/terms" className="underline hover:text-foreground">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
