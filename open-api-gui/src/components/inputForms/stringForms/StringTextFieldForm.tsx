import React from "react";
import GenericTextFieldForm, {
  TextFieldFormProps,
} from "../genericForms/GenericTextFieldForm";

const StringTextFieldForm: React.FunctionComponent<TextFieldFormProps<string>> =
  ({
    headingVariant,
    heading,
    description,
    notes,
    label,
    value,
    setValue,
    error,
    errorHelperText,
    type,
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
        type={type}
      />
    );
  };

export default StringTextFieldForm;
