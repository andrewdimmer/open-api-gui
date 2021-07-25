import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { CommonInputFormProps } from "../../../../@types";
import { styles } from "../../../styles";
import MarkdownPreviewTextField from "../../misc/MarkdownPreviewTextField";

const MarkdownTextFieldForm: React.FunctionComponent<
  CommonInputFormProps<string>
> = ({
  headingVariant = "h5",
  heading,
  description,
  label = heading,
  value,
  setValue,
}) => {
  const classes = styles();

  return (
    <Fragment>
      <Typography variant={headingVariant}>{heading}</Typography>
      <Typography>{description}</Typography>
      <MarkdownPreviewTextField
        className={classes.marginedTopBottom}
        markdown={value}
        setMarkdown={setValue}
      />
    </Fragment>
  );
};

export default MarkdownTextFieldForm;
