import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { isString } from "lodash";
import RejectionFiles from "./RejectionFiles";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  height: 394,
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: "#F4F6F8",
  border: `1px dashed alpha ("#919eab", 0.32)`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

function UploadSingleFile({ error = false, file, helperText, sx, ...other }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({ multiple: false, ...other });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && { padding: "5% 0" }),
        }}
      >
        <input {...getInputProps()} />

        <Stack
          direction="column"
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <AddAPhotoIcon />
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "#637381" }}
            textAlign={"center"}
          >
            Drop or Select Image
          </Typography>
        </Stack>

        {file && (
          <Box
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
              overflow: "hidden",
              "& img": { objectFit: "fill", width: 1, height: 1 },
            }}
          >
            <img
              src={isString(file) ? file : file.preview}
              alt="file-preview"
            />
          </Box>
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
    </Box>
  );
}

export default UploadSingleFile;
