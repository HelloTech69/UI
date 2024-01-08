import React from "react";
import ResizeTextarea from "react-textarea-autosize";
import { Textarea, TextareaProps } from "@chakra-ui/react";

// eslint-disable-next-line
export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return <Textarea as={ResizeTextarea} minH="unset" ref={ref} {...props} />;
});
