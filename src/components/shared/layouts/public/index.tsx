import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";

export const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {children}
    </Box>
  );
};
