import { useAuth } from "@/hooks";
import { IUserLoginArgs } from "@/libs/types/user";
import { handleError } from "@/libs/utils/common";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const { onSubmit, getInputProps } = useForm<IUserLoginArgs>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value.trim()) ? null : "無効なメールアドレスです",
      password: (value) =>
        value.trim().length >= 6 ? null : "パスワードが短すぎます",
    },
  });

  const handleSubmit = onSubmit(async (value: IUserLoginArgs, event) => {
    try {
      event.preventDefault();
      setLoading(true);

      await login(value);
      await router.push("/users");

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error(error);
      handleError(error);

      notifications.show({
        title: "エラー",
        message: "メールアドレスとパスワードを確認してください ",
        color: "red",
      });
    }
  });

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        method="post"
        onSubmit={handleSubmit}
        action="/api/auth/callback/credentials"
        className="account-form"
      >
        <TextInput
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="パスワード"
          placeholder="パスワードを入力してください"
          required
          mt="md"
          {...getInputProps("password")}
        />

        <Button fullWidth type="submit" mt="xl" loading={loading}>
          サインインする
        </Button>
      </form>
    </Paper>
  );
};
