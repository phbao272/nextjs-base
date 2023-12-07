import { handleError } from "@/libs/utils/common";
import { API_URL } from "@/libs/utils/contants";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

interface SignUpForm {
  name: string;
  furigana: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const RegisterForm = () => {
  const router = useRouter();

  const { onSubmit, getInputProps, setErrors } = useForm<SignUpForm>({
    initialValues: {
      name: "",
      furigana: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validate: {
      name: (value) => (value?.trim()?.length > 0 ? null : "必要です"),
      furigana: (value) => (value?.trim()?.length > 0 ? null : "必要です"),
      email: (value) =>
        /^\S+@\S+$/?.test(value?.trim()) ? null : "無効なメールアドレスです",
      password: (value) =>
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/?.test(value?.trim())
          ? null
          : "パスワードは6〜12文字で、少なくとも1つの文字と1つの数字を含む必要があります",
      confirm_password: (value, values) =>
        value?.trim() === values?.password?.trim()
          ? null
          : "パスワードが一致しません",
    },
  });

  const { mutate: signUp } = useMutation({
    mutationFn: async (data: SignUpForm) => {
      const res = await axios.post(`${API_URL}/auth/register`, data);

      return res.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "成功",
        message: "管理者の承認をお待ちください",
        color: "green",
      });

      router.push("/wait-approval");
    },
    onError: (error: any) => {
      console.error(error);

      handleError(error);
    },
  });

  const handleSubmit = async (value: SignUpForm) => {
    signUp(value);
  };

  return (
    <Paper
      component="form"
      onSubmit={onSubmit(handleSubmit)}
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
    >
      <TextInput
        label="名前"
        placeholder="お名前を入力してください"
        required
        {...getInputProps("name")}
      />
      <TextInput
        label="フリガナ"
        placeholder="フリガナを入力してください"
        required
        mt="md"
        {...getInputProps("furigana")}
      />
      <TextInput
        label="メールアドレス"
        placeholder="メールアドレスを入力してください"
        required
        mt="md"
        {...getInputProps("email")}
      />
      <PasswordInput
        label="パスワード"
        placeholder="パスワードを入力してください"
        required
        mt="md"
        {...getInputProps("password")}
      />

      <PasswordInput
        label="パスワードを確認する"
        placeholder="パスワードを確認してください"
        required
        mt="md"
        {...getInputProps("confirm_password")}
      />

      <Button type="submit" fullWidth mt="xl">
        登録する
      </Button>
    </Paper>
  );
};
