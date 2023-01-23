import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { ErrorObj } from "../types/DataModels";

export default function ErrorPage() {
  const error = useRouteError() as ErrorObj;
  console.error(error);

  return (
    <Box>
      <Typography variant="h2">{error.statusCode}</Typography>
      <Typography variant="h5">{error.statusText}</Typography>
      <Typography variant="body1">{error.message}</Typography>
    </Box>
  );
}
