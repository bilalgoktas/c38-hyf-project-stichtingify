import styles from "./ContextMenu.module.scss";
import React from "react";
import PropTypes from "prop-types";

const ContextMenuButton = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const ContextMenu = ({ buttonList, style = {} }) => {
  return (
    <div className={styles.contextMenu} style={style}>
      {buttonList.map((button, index) => (
        <ContextMenuButton
          key={index}
          name={button.name}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};

ContextMenuButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};

ContextMenu.propTypes = {
  buttonList: PropTypes.array,
  style: PropTypes.object,
};

export default ContextMenu;
