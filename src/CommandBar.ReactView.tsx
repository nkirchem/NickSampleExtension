import { mergeStyles } from "@fluentui/react";
import { CommandBar } from "@microsoft/azureportal-reactview/CommandBar";
import * as React from "react";

const Sample: React.FC = () => {
  return (
    <div>
      <CommandBar
          className={mergeStyles({ height: 36 })}
          items={[
            {
              key: "refresh",
              onClick: () => console.log("Refresh"),
              name: "Refresh",
            },
          ]}
        />
        <div style={{ backgroundColor: "blue", height: "100px", width: "100px" }}></div>
    </div>
  );
};

export default Sample;