import Sidebar from "../components/Sidebar";
import {
  Heading,
  SimpleGrid,
  useDisclosure
} from "@chakra-ui/react";
import {newsAndNotices} from "../utils/helpers";
import ModalCard from "../components/ModalCard";
import NoticeCard from "../components/NoticeCard";
import Head from "next/head";

export default function News() {
  return (
        <>
           <Head>
           <title>News and Notices</title>
           </Head>
           <Heading fontSize="3rem" mb="2rem">News And Notices</Heading>
           <SimpleGrid columns={2} spacing="2rem">
           {
             newsAndNotices.map((item,i) => (
              <>
               <ModalCard key={i} item={item}/>
               </>
              ))
           }
           </SimpleGrid>
        </>
  );
}
