import { Box, Dialog } from "@mui/material";
import SmallButtonSquare from "../SmallButtonSquare/smallButtonSquare";
import SubHeadline from "../SubHeadline/subHeadline";

const OptionPopupBox = ({ open, handleClose, enTitle, arTitle, buttons }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          width: "500px",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <SubHeadline enText={enTitle} arText={arTitle} />
        {buttons.length ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              justifyContent: "end",
            }}
          >
            {buttons?.map((button, index) => (
              <SmallButtonSquare
                enText={button?.enText}
                arText={button?.arText}
                varient={button?.varient}
                handleClick={button?.handleClick}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
};

export default OptionPopupBox;
