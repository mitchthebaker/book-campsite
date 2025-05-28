import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import LoginForm from "~/components/LoginForm";

export const Route = createFileRoute("/login/")({
  component: Login,
})

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login
          </h1>
        </div>
        <LoginForm />
        <div className="flex flex-col items-center justify-center gap-2">
          <Link
            className="text-sm font-medium text-secondary-foreground hover:underline"
            to="/"
          >
            Register
          </Link>
          <Link
            className="text-sm font-medium text-secondary-foreground  hover:underline"
            to="/"
          >
            Forgot your password?
          </Link>
        </div>
      </section>
    </div>
  );
};