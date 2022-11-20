import React, { useState, forwardRef, useImperativeHandle } from "react";
import cn from "classnames";
import styles from "./Snackbar.module.sass";
export const SnackbarType = {
    success: "success",
    error: "fail",
  };

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));
  
  return (
    <div
      className={cn(styles.snackbar, 
                    props.type === SnackbarType.success ? 
                                   styles.success : styles.error,
                    showSnackbar ? styles.show : styles.hide)}
    >
      <div className={styles.message}>{props.message}</div>
    </div>
  );
});

export default Snackbar;