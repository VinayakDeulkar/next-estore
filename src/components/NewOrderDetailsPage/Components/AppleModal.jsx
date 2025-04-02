import React, { useContext } from "react";
import "./appleModal.css";
import { LanguageContext } from "../../../App";

const AppleModal = ({ closeModal, onAppleClick }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div
      id="myModal"
      className="modal-made appleModalWidth"
      onClick={closeModal}
    >
      <div className="modal-content-made">
        <div className="appleCard" onClick={(e) => e.stopPropagation()}>
          <div className="backButtonDiv" onClick={closeModal}>
            {/* <ModalCross height={15} width={15} /> */}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <img
                style={{ height: "22px" }}
                src={"pictures/newApplePayButton.png"}
              />
            </div>
            <div className="payByText">
              {language === "ltr" ? "Select card type" : "اختر نوع البطاقة"}
            </div>
          </div>
          <div className="buttonDiv">
            <div
              className="applebutton"
              onClick={() => {
                onAppleClick("4");
              }}
            >
              <div className="flexDiv">
                <img
                  src="pictures/knet icon mini.png"
                  style={{ height: "18px" }}
                />
              </div>
              <div className="flexDiv">
                {language === "ltr" ? "Debit Card" : "بطاقة ائتمان"}
              </div>
            </div>
            <div
              className="applebutton"
              onClick={() => {
                onAppleClick("5");
              }}
            >
              <div className="flexDiv">
                <img src="pictures/visa.png" style={{ height: "16px" }} />
                <img src="pictures/master.png" style={{ height: "16px" }} />
              </div>
              <div className="flexDiv">
                {language === "ltr" ? "Credit Card" : "بطاقة إئتمان"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleModal;
