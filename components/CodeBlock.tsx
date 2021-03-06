import React, { FC } from "react";
import { Button, Flex, Stack, Tag, Icon } from "@chakra-ui/react";
import {
  SandpackThemeProvider,
  useSandpack,
  useSandpackTheme,
} from "@codesandbox/sandpack-react";
import { formatFilePath, SandpackLanguageSupport } from "./utils";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { lineNumbers } from "@codemirror/gutter";
import {
  getCodeMirrorLanguage,
  getEditorTheme,
  getSyntaxHighlight,
} from "./utils";
import { Box } from "@chakra-ui/react";
import useCustomTheme from "../hooks/useCustomTheme";

interface CodeBlockProps {
  path: string;
  code: string;
  language: SandpackLanguageSupport;
  showLineNumbers?: boolean;
}

const themeOverrides = {
  typography: {
    monoFont: "Ubuntu Mono",
    bodyFont: "Poppins",
    fontSize: "1rem",
  },
  palette: {
    defaultBackground: "#252325",
    activeText: "var(--chakra-colors-pink-200)",
    accent: "var(--chakra-colors-pink-200)",
  },
  syntax: {
    tag: "var(--chakra-colors-pink-300)",
    keyword: "var(--chakra-colors-purple-300)",
    property: "var(--chakra-colors-purple-200)",
    string: "var(--chakra-colors-orange-200)",
    plain: "var(--chakra-colors-pink-100)",
  },
};

const CodeBlock: FC<CodeBlockProps> = ({
  path,
  code,
  language = "typescript",
  showLineNumbers = false,
}) => {
  const { theme } = useCustomTheme(themeOverrides);
  const editor = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const currentEditor = editor.current as HTMLDivElement;

    const extensions = [
      getCodeMirrorLanguage(language),
      getEditorTheme(theme),
      getSyntaxHighlight(theme),
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
    ];

    if (showLineNumbers) {
      extensions.push(lineNumbers());
    }

    const state = EditorState.create({
      doc: code,
      extensions,
    });
    const view = new EditorView({ state, parent: currentEditor });

    return () => view.destroy();
  }, [editor.current]);

  return (
    <Stack
      bg={theme.palette.defaultBackground}
      rounded="lg"
      spacing={-2}
      w="100%"
      my={8}
    >
      {path && (
        <Flex p={2} justifyContent="space-between">
          <Tag
            size="md"
            bg="none"
            color="orange.200"
            opacity={0.8}
            cursor="pointer"
            _hover={{
              opacity: 1,
            }}
            rounded="lg"
          >
            {formatFilePath(path)}
          </Tag>
        </Flex>
      )}
      <Box
        py={4}
        px={4}
        bg={theme.palette.defaultBackground}
        rounded="lg"
        overflow="hidden"
        tabIndex={-1}
        ref={editor}
      />
    </Stack>
  );
};

const CodeBlockWrapper: FC<CodeBlockProps> = (props) => {
  return (
    <SandpackThemeProvider theme="sandpack-dark">
      <CodeBlock {...props} />
    </SandpackThemeProvider>
  );
};

export default CodeBlockWrapper;
