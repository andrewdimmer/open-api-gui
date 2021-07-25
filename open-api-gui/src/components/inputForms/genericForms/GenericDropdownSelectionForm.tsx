import { MenuItem, TextField, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React, { Fragment } from "react";
import { ErrorableCommonInputFormProps } from "../../../../@types";
import { styles } from "../../../styles";

export interface DropdownSelectionFormProps<T>
  extends ErrorableCommonInputFormProps<T> {
  options: { label: React.ReactNode; value: T }[];
}

const GenericDropdownSelectionForm: React.FunctionComponent<
  DropdownSelectionFormProps<any>
> = ({
  headingVariant = "h5",
  heading,
  description,
  label = heading,
  value,
  setValue,
  error,
  errorHelperText,
  options,
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
        id={`select-${id}`}
        label={label}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        select
        value={value}
        variant="outlined"
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={`select-${id}-option-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </TextField>
    </Fragment>
  );
};

export default GenericDropdownSelectionForm;
