import { TextField, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React, { Fragment } from "react";
import { ErrorableCommonInputFormProps } from "../../../../@types";
import { styles } from "../../../styles";

export interface TextFieldFormProps<T>
  extends ErrorableCommonInputFormProps<T> {
  type?: "email" | "number" | "password" | "serach" | "tel" | "text" | "url";
}

const GenericTextFieldForm: React.FunctionComponent<TextFieldFormProps<any>> =
  ({
    headingVariant = "h5",
    heading,
    description,
    label = heading,
    value,
    setValue,
    error,
    errorHelperText,
    type = "text",
  }) => {
    const classes = styles();

    const id = label.toLowerCase().replaceAll(" ", "-");

    return (
      <Fragment>
        <Typography variant={headingVariant}>{heading}</Typography>
        <Typography>{description}</Typography>
        <TextField
          className={classes.marginedTopBottom}
          error={error}
          fullWidth={true}
          helperText={
            error &&
            errorHelperText && (
              <Fragment>
                <Error fontSize="inherit" />
                {" " + errorHelperText}
              </Fragment>
            )
          }
          id={`enter-${id}`}
          label={label}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          type={type}
          value={value}
          variant="outlined"
        />
      </Fragment>
    );
  };

export default GenericTextFieldForm;
