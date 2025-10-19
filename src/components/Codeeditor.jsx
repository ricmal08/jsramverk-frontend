import React from 'react';
import {useState} from "react"
import Editor from '@monaco-editor/react';
import { Box} from "@chakra-ui/react"

const CodeEditor = () => {
        const [value, setValue] = useState('//some comment')
    return (
    <Box>
        <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        //defaultValue="//test kommentar"
        value={value}
        onChange={(value) => setValue(value)}
        />
    </Box>
    );
}

export default CodeEditor


