export interface CommonInputFormProps<T> {
  headingVariant?: "h4" | "h5" | "h6";
  heading: string;
  description: React.ReactNode;
  label?: string;
  value: T;
  setValue: (value: T) => void;
  error?: boolean;
  errorHelperText?: string;
}

export interface ErrorableCommonInputFormProps<T>
  extends CommonInputFormProps<T> {
  error?: boolean;
  errorHelperText?: string;
}
