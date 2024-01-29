import * as React from "react";
// import { MonacoDiffEditor, MonacoDiffEditorProps } from "react-monaco-editor";

export interface Snapshot {
    readonly id: string;
    readonly name: string;
    readonly timestamp: string;
    readonly json: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    readonly correlationId?: string;
}

/**
 * The SnapshotInfo component.
 *
 * @param {SnapshotInfoProps} props The snapshot properties.
 * @returns {React.ReactElement} The SnapshotInfo component.
 */
export function SnapshotInfo(props: SnapshotInfoProps): React.ReactElement {
    const monacoTheme = "";

    const { dashboardJson = { foo: "123" }, snapshot = { json: { foo: "123", bar: "456" } } } = props;

    return React.useMemo(() => {
        // Don't show the editer before theme is passed to avoid flickering
        if (monacoTheme === null) {
            return <></>;
        }

        return <div>OK!!!</div>;
        /*
        const modifiedJson = snapshot.json;
        const editorProps: MonacoDiffEditorProps = {
            language: "javascript",
            theme: monacoTheme,
            original: JSON.stringify(dashboardJson, null, 2),
            value: JSON.stringify(modifiedJson, null, 2),
            height: 500,
            options: {
                readOnly: true,
            },
        };

        return <>{!props.onChange && <MonacoDiffEditor {...editorProps} />}</>;*/
    }, [dashboardJson, snapshot.json, monacoTheme]);
}

export default SnapshotInfo;
interface SnapshotInfoProps {
    snapshot?: Snapshot;
    dashboardJson?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    onChange?: (event: { name: string; value: string }) => void;
}
