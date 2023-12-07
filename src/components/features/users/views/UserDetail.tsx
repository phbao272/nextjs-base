import { Paper } from "@mantine/core";
import {  UserInfo } from ".";

interface Props {
  userId: number;
}

export const UserDetail: React.FC<Props> = ({ userId }) => {
  return (
    <Paper
      shadow="md"
      radius="md"
      p="md"
      sx={{
        backgroundColor: "#fff",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <UserInfo userId={userId} />
    </Paper>
  );
};
