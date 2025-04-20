import { AppContext } from "@/context/AppContext";
import { Box, Dialog } from "@mui/material";
import { useContext, useEffect } from "react";
import ModeSelector from "../common/ModeSelector/modeSelector";
import "./areaModal.css";
import DeliveryArea from "./DeliveryArea";
import PickUpArea from "./PickUpArea";

const AreaModal = ({ showAreaModal, handleClose, setMarkerPosition }) => {
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
          },
        }}
      >
        <Box
          sx={{
            height: "calc(100vh - 50px)",
            padding: "20px",
            width: window.innerWidth > 600 ? "560px" : "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
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
