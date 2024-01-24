import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import * as AllResources from "./Resources.resjson";
// import { StatusBarType, dismissStatusBar, showStatusBar } from "@microsoft/azureportal-reactview/StatusBar";
import { TagsByResource, TargetItem } from "@microsoft/azureportal-reactview/TagsByResource";
import { ChoiceGroup, IChoiceGroupProps, DefaultButton, Pivot, PivotItem, TextField, mergeStyles, PrimaryButton } from "@fluentui/react";
import { FilterableDropdown } from "@microsoft/azureportal-reactview/FilterableDropdown";
import { writeSetting, readSettings } from "@microsoft/azureportal-reactview/PersistentStorage";
import { getEnvironmentValue } from "@microsoft/azureportal-reactview/Environment";
import { FormLabel, useFormLabelContext } from "@microsoft/azureportal-reactview/FormLabel";
import { useDebounce } from "./Platform/AsyncHooks";

Az.setTitle(AllResources.Resources.HelloWorldTitle);

export const HelloWorld2 = () => {
    const lastStorageTime = React.useRef(localStorage.getItem("lastStorageTime"));
    const newStorageTime = Date.now().toString();
    localStorage.setItem("lastStorageTime", newStorageTime);

    return <div>
        <div>Last storage time: {lastStorageTime.current}</div>
        <div>New storage time: {newStorageTime}</div>
    </div>
};

const FormLabelChoiceGroup: React.FC<IChoiceGroupProps> = props => {
    const { ariaLabelledBy } = useFormLabelContext();
    return <ChoiceGroup {...props} ariaLabelledBy={ariaLabelledBy} />;
};

export const HelloWorld = () => {
    const [resourcesText, setResourcesText] = React.useState<string>(`[
    { "id": "resourceId", "displayName": "Resource name", "count": 1 }
]`);
    const [resources, setResources] = React.useState<TargetItem[]>([]);

    const [text, setText] = React.useState("initial text");
    const textFieldOnChange = React.useCallback((_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => { setText(value); }, []);
    const buttonOnClick = useDebounce(() => {
        console.log("BUTTON on click", text);
    }, 1000);

    //dismissStatusBar();
    //showStatusBar(StatusBarType.Warning, "Hello world2" + AllResources.FormResources.Basics);

    const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
    const dropdownOptions = React.useMemo(() => {
        const items: Array<{ key: string; text: string }> = [];
        for (let i = 0; i < 200; i++) {
            items.push({
                key: `option${i}`,
                text: `Option ${i}`,
            });
        }
        return items;
    }, []);

    const updateCheckedItems = (items: string[]) => {
        setCheckedItems(items.length === dropdownOptions.length ? items.concat("::SelectAll::") : items);
    }

    return <div>
        <Pivot className={mergeStyles({ height: 250 })}>
            <PivotItem headerText="Overview">
                <div>Overview content</div>
                <div>Dependencies:</div>
                <pre>{JSON.stringify(getEnvironmentValue("dependencyVersions"))}</pre>
                <div>
                    <FormLabel displayValue={"Form label for choice group"}>
                        <FormLabelChoiceGroup
                            options={[{
                                key: "option1",
                                text: "Option 1",
                            }, {
                                key: "option2",
                                text: "Option 2",
                            }, {
                                key: "option3",
                                text: "Option 3",
                            }]}
                        />
                    </FormLabel>
                </div>
            </PivotItem>
            <PivotItem headerText="Permissions">
                <FilterableDropdown selectedKeys={checkedItems} multiSelect={true} options={dropdownOptions} selectAllOptionKey="::SelectAll::" onChange={(_, option) => {
                    if (option.key === "::SelectAll::") {
                        updateCheckedItems(option.selected ? dropdownOptions.map(o => o.key) : []);
                    } else {
                        let newCheckedItems = new Set<string>(checkedItems.slice());
                        if (option.selected) {
                            newCheckedItems.add(option.key as string);
                        } else {
                            newCheckedItems.delete(option.key as string);
                        }
                        updateCheckedItems(Array.from(newCheckedItems));
                    }
                }} />
            </PivotItem>
            <PivotItem headerText="Debounce">
                <div>
                    <TextField onChange={textFieldOnChange} />
                    <PrimaryButton onClick={buttonOnClick}>Click me!</PrimaryButton>
                </div>
            </PivotItem>
        </Pivot>
        <TextField autoAdjustHeight={true} multiline={true} value={resourcesText} onChange={(_, newValue) => setResourcesText(newValue)}  />
        <DefaultButton text="Read setting" onClick={() => {
            readSettings("key1").then((value) => console.log(`Read key1: ${JSON.stringify(value)}`));
        }} />
        <DefaultButton text="Write setting" onClick={() => {
            writeSetting("key1", Date.now().toString()).then(() => console.log(`Wrote key1`), () => console.log(`Failed to write key1`));
        }} />
        <DefaultButton text="Write multiple settings" onClick={() => {
            const value = Date.now().toString();
            writeSetting("key1", `${value}-1`).then(() => console.log(`Wrote key1=value1`), () => console.log(`Failed to write key1=value1`));
            writeSetting("key1", `${value}-2`).then(() => console.log(`Wrote key1=value2`), () => console.log(`Failed to write key1=value2`));
            writeSetting("key2", `${value}-3`).then(() => console.log(`Wrote key2=value2`), () => console.log(`Failed to write key1=value3`));
        }} />
        <DefaultButton text="Write same setting" onClick={() => {
            readSettings("key1").then((value) => writeSetting("key1", value["key1"]).then(() => console.log(`Wrote same value for key1`), () => console.log(`Failed to write key1`)));
        }} />
        <DefaultButton onClick={() => {
            try {
                const resourcesJson = JSON.parse(resourcesText);
                setResources(resourcesJson);
            } catch (ex) {}
        }} text="Update resources" />
        <p>Current resources: {JSON.stringify(resources)}</p>
        <p>Tags by resource:</p>
        <TagsByResource resources={resources} onTaggedResourcesChange={(value) => console.log(`Resources changed: ${JSON.stringify(value)}`) } />
    </div>
};

export default HelloWorld;
