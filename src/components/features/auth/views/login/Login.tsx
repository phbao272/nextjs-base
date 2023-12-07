import { Container, Title } from "@mantine/core";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <Container size={500} my={40}>
      <Title
        align="center"
        sx={{
          fontWeight: 900,
        }}
      >
        Zen System管理者ログイン
      </Title>
      <LoginForm />
    </Container>
  );
};
