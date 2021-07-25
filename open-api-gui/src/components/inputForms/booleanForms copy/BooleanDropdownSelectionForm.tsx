import React from "react";
import { CommonInputFormProps } from "../../../../@types";
import GenericDropdownSelectionForm from "../genericForms/GenericDropdownSelectionForm";

declare interface BooleanDropdownSelectionFormProps
  extends CommonInputFormProps<boolean | undefined> {
  required?: boolean;
}

const BooleanDropdownSelectionForm: React.FunctionComponent<BooleanDropdownSelectionFormProps> =
  ({
    headingVariant,
    heading,
    description,
    notes,
    label,
    value,
    setValue,
    required,
  }) => {
    const generateOptions = () => {
      const options = [
        { label: "True", value: true },
        { label: "False", value: false },
      ];
      return required
        ? options
        : [
            { label: <em>Undefined</em>, value: undefined } as {
              label: React.ReactNode;
              value: boolean | undefined;
            },
          ].concat(options);
    };

    return (
      <GenericDropdownSelectionForm
        headingVariant={headingVariant}
        heading={heading}
        description={description}
        notes={notes}
        label={label}
        value={value}
        setValue={setValue}
        error={required && value === undefined}
        errorHelperText={`${label} is required`}
        options={generateOptions()}
      />
    );
  };

export default BooleanDropdownSelectionForm;
