import { Loader } from "@mantine/core";

function FullScreenLoading() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader />
    </div>
  );
}

export { FullScreenLoading };
