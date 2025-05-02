import { AppContext } from "@/context/AppContext";
import { Box, Dialog } from "@mui/material";
import React, { useContext } from "react";

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
        <div>
          {language === "ltr" ? termsData?.title : termsData?.arabic_name}
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
