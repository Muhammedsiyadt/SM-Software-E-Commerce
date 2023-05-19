// theme.js

import { extendTheme } from "@chakra-ui/react"
import { StepsTheme as Steps } from "chakra-ui-steps";

export const theme = extendTheme({
    colors: {
        brand: {
            100: "#e5f5ff",
            200: "#b3e1ff",
            300: "#80cdff",
            400: "#0077c5",
            500: "#1aa4ff",
            600: "#008be6",
            700: "#006cb3",
            800: "#004d80",
            900: "#002e4d",
        },
    },
    components: {
        Steps
    },
})

