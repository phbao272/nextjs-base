import { Button, Modal, Text } from "@mantine/core";
import React from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
  title: string;
  isLoading: boolean;
  handleSubmit: () => void;
  color?: "red" | "blue";
}

export const ModalConfirm: React.FC<Props> = ({
  opened,
  title,
  onClose,
  isLoading,
  handleSubmit,
  color = "blue",
}) => {
  return (
    <Modal
      opened={opened}
      withCloseButton={false}
      onClose={onClose}
      size="sm"
      radius="md"
      centered
    >
      <Text
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "12px",
          textAlign: "center",
          padding: "24px",
        }}
      >
        {title}
      </Text>

      <Button.Group
        sx={{
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <Button onClick={onClose} variant="default" fullWidth>
        キャンセル
        </Button>
        <Button loading={isLoading} onClick={handleSubmit} color={color} fullWidth>
          OK
        </Button>
      </Button.Group>
    </Modal>
  );
};
