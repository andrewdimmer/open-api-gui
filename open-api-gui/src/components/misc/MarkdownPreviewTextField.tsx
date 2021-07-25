import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import {
  NormalComponents,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getIsDarkMode } from "../../helpers/globalVariables";

declare interface MarkdownPreviewTextFieldProps {
  className?: string;
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

export const markdownSyntaxHighlightingComponents: Partial<
  NormalComponents & SpecialComponents
> = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return inline ? (
      <code>{children}</code>
    ) : match ? (
      <SyntaxHighlighter
        customStyle={{ padding: "0px" }}
        language={(match && match[1]) || undefined}
        style={getIsDarkMode() ? vscDarkPlus : vs}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code>{children}</code>
    );
  },
};

const MarkdownPreviewTextField: React.FunctionComponent<MarkdownPreviewTextFieldProps> =
  ({ className, markdown, setMarkdown }) => {
    return (
      <Grid container spacing={2} className={className}>
        <Grid item xs={6}>
          <Typography variant="caption">Edit:</Typography>
          <TextField
            fullWidth={true}
            onChange={(event) => {
              setMarkdown(event.target.value);
            }}
            multiline
            value={markdown}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Preview:</Typography>
          <ReactMarkdown components={markdownSyntaxHighlightingComponents}>
            {markdown}
          </ReactMarkdown>
        </Grid>
      </Grid>
    );
  };

export default MarkdownPreviewTextField;
