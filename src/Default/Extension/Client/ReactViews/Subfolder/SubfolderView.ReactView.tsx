import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { Resources } from "../Resources.resjson";

Az.setTitle(Resources.HelloWorldTitle);

const HelloWorld = () => {
    return <div>
        <Text data-testid="helloworld-text-testid">Subfolder page!!! OK there 123 456</Text>
    </div>;
};

export default HelloWorld;
