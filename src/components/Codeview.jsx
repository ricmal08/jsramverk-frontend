import { Box, Button, Text } from "@chakra-ui/react";
const CodeView = ( {editorRef, language}) => {

    const runCode = async (args) => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {

        } catch (error) {
            console.error("Fel vid datahämtning")
        }

    }
    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">CodeView  </Text>
            <Button
                variant='outline'
                colorScheme="green"
                color="white"
                mb={4}
            >
                Run Code
            </Button>
            <Box
                height="90vh"
                bg="#1f1e1eff"
                p={2}
                border="1px solid"
                borderRadius={4}
                borderColor="#333"
                color="white"

            >
            Test

            </Box>
        </Box>
    )
}

export default CodeView