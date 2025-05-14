import { AppContext } from "@/context/AppContext";
import { Box, Dialog } from "@mui/material";
import { useContext, useEffect } from "react";
import ModeSelector from "../common/ModeSelector/modeSelector";
import "./areaModal.css";
import DeliveryArea from "./DeliveryArea";
import PickUpArea from "./PickUpArea";

const AreaModal = ({ showAreaModal, handleClose, setMarkerPosition, type }) => {
  const { areaDetails } = useContext(AppContext);
  useEffect(() => {}, [areaDetails]);

  return (
    <>
      <Dialog
        open={showAreaModal}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          "& .MuiDialog-container > .MuiPaper-root": {
            borderRadius: "16px", // Change this value as needed
            minWidth: "400px",
            margin: "15px",
            overflow: "hidden",
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
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModeSelector />
          {areaDetails?.type === "pickup" ? (
            <PickUpArea handleClose={handleClose} />
          ) : (
            <DeliveryArea
              setMarkerPosition={setMarkerPosition}
              handleClose={handleClose}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default AreaModal;
