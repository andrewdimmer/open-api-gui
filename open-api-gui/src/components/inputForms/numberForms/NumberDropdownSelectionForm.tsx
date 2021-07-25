import React from "react";
import GenericDropdownSelectionForm, {
  DropdownSelectionFormProps,
} from "../genericForms/GenericDropdownSelectionForm";

const NumberDropdownSelectionForm: React.FunctionComponent<
  DropdownSelectionFormProps<number>
> = ({
  headingVariant,
  heading,
  description,
  label,
  value,
  setValue,
  error,
  errorHelperText,
  options,
}) => {
  return (
    <GenericDropdownSelectionForm
      headingVariant={headingVariant}
      heading={heading}
      description={description}
      label={label}
      value={value}
      setValue={setValue}
      error={error}
      errorHelperText={errorHelperText}
      options={options}
    />
  );
};

export default NumberDropdownSelectionForm;
