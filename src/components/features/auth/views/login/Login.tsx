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
        Mai an cuc
      </Title>
      <LoginForm />
    </Container>
  );
};
