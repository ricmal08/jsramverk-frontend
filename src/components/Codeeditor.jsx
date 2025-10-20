import React from 'react';
import {useRef, useState} from "react"
import {Editor} from '@monaco-editor/react';
import { Box} from "@chakra-ui/react"

const CodeEditor = () => {
        const editorRef = useRef()
    const [value, setValue] = useState("")

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
}

    return (
    <Box>
        <Editor
        height="75vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        //defaultValue="//test kommentar"
        onMount ={
        onMount
        }
        value={value}
        onChange={(value) => setValue(value)}
        />
    </Box>
    );
}

export default CodeEditor


