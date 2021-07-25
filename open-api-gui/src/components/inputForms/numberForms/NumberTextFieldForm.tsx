import React from "react";
import { ErrorableCommonInputFormProps } from "../../../../@types";
import GenericTextFieldForm from "../genericForms/GenericTextFieldForm";

const NumberTextFieldForm: React.FunctionComponent<
  ErrorableCommonInputFormProps<number>
> = ({
  headingVariant,
  heading,
  description,
  notes,
  label,
  value,
  setValue,
  error,
  errorHelperText,
}) => {
  return (
    <GenericTextFieldForm
      headingVariant={headingVariant}
      heading={heading}
      description={description}
      notes={notes}
      label={label}
      value={value}
      setValue={setValue}
      error={error}
      errorHelperText={errorHelperText}
      type="number"
    />
  );
};

export default NumberTextFieldForm;
