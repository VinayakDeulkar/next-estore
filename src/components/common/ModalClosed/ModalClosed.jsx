import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

function ModalClosed({ setNote, note }) {
  const { language } = useContext(AppContext);

  const onNoClick = () => {
    setNote((r) => false);
  };

  return (
    <div id="myModal" className="modal-made">
      <div className="modal-content-made">
        <p className="header-modal">
          {language == "ltr" ? "Shop Closed" : "المحل مغلق"}
        </p>
        <p className="text-modal">
          {" "}
          {language == "ltr"
            ? "Sorry we cannot place your order due to the shop being currently closed"
            : "نأسف لعدم تمكننا من تقديم طلبك بسبب إغلاق المتجر حاليًا"}
        </p>
        <div className="button-container">
          <button onClick={() => onNoClick()} className="green">
            {language == "ltr" ? "OK" : "حسناً"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalClosed;
