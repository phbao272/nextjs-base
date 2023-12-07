import { Container, Title } from "@mantine/core";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
  return (
    <Container size={500} my={40}>
      <Title
        align="center"
        sx={{
          fontWeight: 900,
        }}
      >
        アカウントを作成する
      </Title>
      <RegisterForm />
    </Container>
  );
};
