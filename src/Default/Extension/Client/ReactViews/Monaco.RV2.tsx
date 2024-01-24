import * as React from "react";
import { default as MonacoEditor } from "react-monaco-editor";

const MonacoEditorDemo: React.FC = () => {
  const [code, setCode] = React.useState(
    "export function hello(): string {\n\talert('Hello world, Microsoft!');\n\treturn 'Hi';\n}"
  );

  return <MonacoEditor width="800" height="600" language="typescript" value={code} onChange={setCode} />;
};

export default MonacoEditorDemo;
