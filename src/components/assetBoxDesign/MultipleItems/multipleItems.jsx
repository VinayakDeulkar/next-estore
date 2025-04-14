import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import Spinner from "@/components/common/Spinner/spinner";
import { AppContext } from "@/context/AppContext";

const MultipleItems = ({
  count = 1,
  addClick,
  removeClick,
  loading = false,
}) => {
  const { homePageDetails } = useContext(AppContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <IconButton
        sx={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          backgroundColor: "#D9D9D9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={removeClick}
      >
        <RemoveIcon sx={{ fontSize: "15px", color: "#000" }} />
      </IconButton>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            height="15px"
            size="2px"
            color={homePageDetails?.vendor_data?.vendor_color}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {count}
        </div>
      )}
      <IconButton
        sx={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          backgroundColor: "#D9D9D9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={addClick}
      >
        <AddIcon sx={{ fontSize: "15px", color: "#000" }} />
      </IconButton>
    </div>
  );
};

export default MultipleItems;
