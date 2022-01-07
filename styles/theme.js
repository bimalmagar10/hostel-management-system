import {extendTheme} from "@chakra-ui/react";

import {createBreakpoints} from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
	sm:"40em",
	md:"52em",
	lg:"64em",
	xl:"80em"
});
const fonts = {mono:`'Menlo',monospace`};

const theme = extendTheme({
	styles:{
		global:{
			"html":{
				fontSize:"62.5%"
			},
			"body":{
				boxSizing:"border-box",
				fontSize:"1.8rem",
				fontFamily:`"Open Sans","sans-serif"`
			},
			"*,*::after,*::before":{
				boxSizing:"inherit"
			},
			'.chakra-heading':{
				fontFamily:"inherit"
			},
			'.block-head th':{
				fontSize:"1.6rem !important",
				textAlign:"center"
			},
			'.block-data td':{
				fontSize:'1.5rem',
				textAlign:"center"
			},
		}
	},
	fonts,
	colors:{
		black:"#000",
	},
	breakpoints,
});

export default theme;
