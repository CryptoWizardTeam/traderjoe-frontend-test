import { ReactNode } from "react";

import { ColumnCenter, Text, Box } from "@pancakeswap/uikit";

export function InfoBox({ message, icon }: { message?: ReactNode; icon: ReactNode }) {
  return (
    <Box style={{ border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "8px", padding: "8px" }}>
      <ColumnCenter
        style={{
          height: "100%",
          justifyContent: "center",
          border: "1px dashed rgba(255, 255, 255, 0.06)",
          padding: "12px",
        }}
      >
        {icon}
        {message && (
          <Text pt="4px" textAlign="center" fontSize="12px" fontWeight="300" color="textSubtle">
            {message}
          </Text>
        )}
      </ColumnCenter>
    </Box>
  );
}
