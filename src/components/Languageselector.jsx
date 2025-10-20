//import { Menu } from "@chakra-ui/react"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

import { Box, Button, Text } from "@chakra-ui/react";
import { Language_Versions } from "../constants"

const languages = Object.entries(Language_Versions)

const LanguageSelector = ({language, onSelect}) => {
    return (
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize='lg'>
                Välj Språk:
            </Text>
            <Menu>
                <MenuButton as={Button}>
                    {language}
                </MenuButton>

                <MenuList zIndex={999} bg="#111">{/*adderar zIndex för att lösa problemet med layers*/}
                    {

                        languages.map(([language, version]) => (
                            <MenuItem key={language}
                                color="white"
                                onClick={() => onSelect(language)}>
                                {language}
                                &nbsp;
                                <Text as="span" color="gray.500" fontSize="sm">
                                    ({version})
                                </Text>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Box>
    );
};

export default LanguageSelector;