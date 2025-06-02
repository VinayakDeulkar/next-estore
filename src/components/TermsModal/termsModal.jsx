import { AppContext } from "@/context/AppContext";
import { Box, Dialog, IconButton } from "@mui/material";
import React, { useContext } from "react";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import ClearIcon from "@mui/icons-material/Clear";

const TermsModal = ({ isOpen, handleClose, termsData, type }) => {
  const { language } = useContext(AppContext);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      sx={{
        "& .MuiDialog-container > .MuiPaper-root": {
          borderRadius: "16px",
          minWidth: "400px",
          margin: "15px",
        },
        "& .MuiDialog-container": {
          justifyContent: type === "deskCheckout" ? "center" : "flex-start",
        },
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          padding: "20px",
          width: window.innerWidth > 990 ? "560px" : "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            "& .MuiIconButton-root": {
              padding: 0,
            },
          }}
        >
          <IconButton onClick={handleClose}>
            <ClearIcon
              sx={{
                fill: "#000",
              }}
            />
          </IconButton>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-5px"
          }}
        >
          <SubHeadline
            enText={termsData?.title}
            arText={termsData?.arabic_name}
            fontSize={"18px"}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              language === "ltr"
                ? termsData?.description
                : termsData?.arabic_description,
          }}
          style={{ textAlign: "start" }}
        ></div>
      </Box>
    </Dialog>
  );
};

export default TermsModal;
