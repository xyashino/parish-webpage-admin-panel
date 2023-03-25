import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { forwardRef, useImperativeHandle, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

interface Props {
  defaultValue?: string;
}
export interface EditorComponentRef {
  getRawHtml: () => string;
}

let options = {
  inlineStyles: {
    BOLD: { element: "span", attributes: { className: "font-bold" } },
    ITALIC: { element: "span", attributes: { className: "italic" } },
    UNDERLINE: { element: "span", attributes: { className: "underline" } },
    STRIKETHROUGH: {
      element: "span",
      attributes: { className: "line-through" },
    },
    UNORDERED: { attributes: { className: "list-disc" } },
    ORDERED: { element: "ul", attributes: { className: "list-decimal" } },
  },
};

export const RichTextEditor = forwardRef<EditorComponentRef, Props>(
  ({ defaultValue }: Props, ref) => {
    const [editorState, setEditorState] = useState(
      defaultValue
        ? () => EditorState.createWithContent(stateFromHTML(defaultValue))
        : () => EditorState.createEmpty()
    );

    const getRawHtml = () => {
      return stateToHTML(editorState.getCurrentContent(), options);
    };
    useImperativeHandle(ref, () => ({
      getRawHtml,
    }));

    const iconClassName =
      "p-2 bg-accent border-0  hover:bg-accent-focus  transition-color";

    return (
      <Editor
        editorState={editorState}
        toolbar={{
          options: ["inline", "history", "list"],
          inline: {
            className: "p-4 bg-primary rounded-box mx-4",
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
            bold: {
              className: iconClassName,
            },
            italic: {
              className: iconClassName,
            },
            underline: {
              className: iconClassName,
            },
            strikethrough: {
              className: iconClassName,
            },
            monospace: {
              className: iconClassName,
            },
          },
          history: {
            className: "p-4 bg-primary rounded-box mx-4",
            undo: {
              className: iconClassName,
            },
            redo: {
              className: iconClassName,
            },
          },
          list: {
            className: "p-4 bg-primary rounded-box mx-4",
            options: ["unordered", "ordered", "indent", "outdent"],
            unordered: {
              className: iconClassName,
            },
            ordered: {
              className: iconClassName,
            },
            indent: {
              className: iconClassName,
            },
            outdent: {
              className: iconClassName,
            },
          },
        }}
        onEditorStateChange={setEditorState}
        wrapperClassName="border-2 rounded-box m-8 shadow w-full prose bg-base-100"
        editorClassName="p-4 min-h-[200px] prose bg-base-100 m-2"
        toolbarClassName="rounded-box p-4 z-50  flex flex-wrap justify-around"
      />
    );
  }
);
