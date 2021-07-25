import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Theme,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { createStyles, makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { SyntheticEvent } from "react";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    success: {
      color: theme.palette.getContrastText(theme.palette.success.main),
      backgroundColor: theme.palette.success.main,
    },
    error: {
      color: theme.palette.getContrastText(theme.palette.error.main),
      backgroundColor: theme.palette.error.main,
    },
    info: {
      color: theme.palette.getContrastText(theme.palette.info.main),
      backgroundColor: theme.palette.info.main,
    },
    warning: {
      color: theme.palette.getContrastText(theme.palette.warning.main),
      backgroundColor: theme.palette.warning.main,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export interface SnackbarProps {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}

const MySnackbarContentWrapper: React.FunctionComponent<SnackbarProps> = (
  props: SnackbarProps
) => {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

declare enum NotificationTypesEnum {
  success,
  error,
  info,
  warning,
}

declare type NotificationTypes = keyof typeof NotificationTypesEnum;

declare interface NotificationMessageInterface {
  message: string;
  type: NotificationTypes;
}

export type NotificationMessage = NotificationMessageInterface | null;

declare interface MessageProps {
  notification: NotificationMessage;
  setNotification: (notificationMessage: NotificationMessage) => void;
}

export default function NotificationBar({
  notification,
  setNotification,
}: MessageProps) {
  const [displayNotification, setDisplayNotification] =
    React.useState<NotificationMessageInterface>({ type: "info", message: "" });

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification(null);
  };

  if (notification && notification !== displayNotification) {
    setDisplayNotification(notification);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={!!notification}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={displayNotification.type}
          message={displayNotification.message}
        />
      </Snackbar>
    </div>
  );
}
