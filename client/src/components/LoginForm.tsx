import { Form, FormField } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FormInput } from "./FormInput";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginValidationSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
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
    </Form>
  )
}