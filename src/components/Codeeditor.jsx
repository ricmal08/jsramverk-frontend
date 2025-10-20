import React from 'react';
import {useRef, useState} from "react"
import {Editor} from '@monaco-editor/react';
import { Box} from "@chakra-ui/react"
import LanguageSelector from './Languageselector';

const CodeEditor = () => {
        const editorRef = useRef()
    const [value, setValue] = useState("")
    const [language, setLanguage] = useState("javascript")

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }

    const onSelect = (language) => {
        setLanguage(language)
    }
    return (
    <Box position="relative" zIndex={10}>
        <LanguageSelector language={language} onSelect={onSelect}/>
        <Box position="relative" zIndex={1}>
            <Editor
            height="90vh"
            theme="vs-dark"
            language={language}
            //defaultValue="//test kommentar"
            onMount ={
            onMount
            }
            value={value}
            onChange={(value) => setValue(value)}
            />
        </Box>
    </Box>
    );
}

export default CodeEditor


