import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
const useUnsavedChangesWarning = (
    message = "Are you sure want to discard changes?"
) => {
    const [isDirty, setDirty] = useState(false);

    useEffect(() => {
        //Detecting browser tab closing
        window.onbeforeunload = isDirty && (() => message);
        return () => window.onbeforeunload = null;
    }, [isDirty]);

    // const myPrompt = <Prompt when={isDirty} message={message} />; // doesn't work in v6 (worked in v5). May be added in next versions. Display in App.jsx as {Propmt}

    return [() => setDirty(true), () => setDirty(false)];
};

export default useUnsavedChangesWarning;