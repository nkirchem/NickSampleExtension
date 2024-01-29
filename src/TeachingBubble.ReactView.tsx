import * as React from "react";
import { DefaultButton, TeachingBubble } from "@fluentui/react";

const Repro = () => {
    const [showTeachingBubble, setShowTeachingBubble] = React.useState(false);
    return <div>
        <DefaultButton text="Click to show teaching bubble" onClick={() => setShowTeachingBubble(show => !show)} />
        {showTeachingBubble && <TeachingBubble target={{ top: 35, left: 0 }}>Text</TeachingBubble> }
    </div>;
};

export default Repro;