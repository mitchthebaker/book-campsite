import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "~/components/LoginForm";

export const Route = createFileRoute("/login/")({
  component: Login,
})

export function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  );
};