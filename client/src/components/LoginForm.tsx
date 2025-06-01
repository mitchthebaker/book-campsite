import { Form, FormField } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FormInput } from "./FormInput";
import { useLogin } from "~/shared/hooks/useLogin";
import { useAuth } from "~/providers/AuthProvider";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginValidationSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log("Login successful:", response);
        alert("Login success");
      },
      onError: (error) => {
        alert(error.message)
      },
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInput label="Email">
              <Input {...field} />
            </FormInput>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormInput label="Password">
              <Input {...field} type="password" placeholder="••••••••"  />
            </FormInput>
          )}
        />
        <Button type="submit" className="mt-4 w-full">Login</Button>
      </form>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), "flex gap-2 text-foreground")}
        onClick={login}
      >
        Login with Keycloak
      </button>
    </Form>
  )
}