import {  Stack, Title } from "@mantine/core";

interface Props {
  userId: number;
}

export const UserInfo: React.FC<Props> = ({ userId }) => {

  return (
    <Stack
      sx={{
        gap: "0.5rem",
      }}
    >
      <Title order={2}>User detail {userId}</Title>      
    </Stack>
  );
};
