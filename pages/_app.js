import {ChakraProvider} from "@chakra-ui/react";
import theme from "../styles/theme";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
function MyApp({ Component, pageProps}) {
  return (
      <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
      </ChakraProvider>
    );
}

export default MyApp;