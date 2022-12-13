import React from "react";
import PropTypes from "prop-types";
import "../../components/Popup/Popup.css";
import { MdClose } from "react-icons/md";

function Popup(props) {
  return props.isTrigger ? (
    <div className="popup-external">
      <div className="popup-internal">
        <MdClose
          className="close-icon"
          onClick={() => props.setIsPopupTrigger(false)}
        />
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;

Popup.propTypes = {
  props: PropTypes.array,
  children: PropTypes.array,
  isTrigger: PropTypes.bool,
  setIsPopupTrigger: PropTypes.func,
};
