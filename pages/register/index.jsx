import { useLoginMutation } from "@/redux/features/auth/authAPI";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuthState();
  const [proceedLogin, { data: loginData, isError, isSuccess }] =
    useLoginMutation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => !value && "Email is required !",
      password: (value) => !value && "Password is required !",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/management/users");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isSuccess) {
      if (loginData?.data?.user?.baseRole === "Official") {
        notifications.show({
          title: "Login",
          message: loginData?.message,
        });
        router.push("/dashboard/management/users");
      } else {
        notifications.show({
          title: "Unauthorize Access",
          message: "You are not allowed here !",
        });
      }
    }
  }, [isSuccess, loginData]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        proceedLogin(values);
      })}
      className="grid grid-cols-1 gap-5 p-10"
    >
      <TextInput
        {...form.getInputProps("email")}
        label="Email"
        placeholder="Enter your email"
        className="col-span-1"
      />
      <PasswordInput
        {...form.getInputProps("password")}
        label="Password"
        placeholder="Enter your password"
        className="col-span-1"
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
