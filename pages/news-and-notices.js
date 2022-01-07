import {useState,useEffect} from "react";
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
import Pagination from "../components/Pagination";
import {useFetch} from "../utils/utils";
export default function News() {
  const {data,loading} = useFetch();
  let [page,setPage] = useState(0);
  let [news,setNews] = useState([]);
  useEffect(() =>{
      if(loading) return;
      setNews(data[page]);
  },[loading,page]);

  const handlePrev = () => {
    setPage(oldPage => {
      let prevPage = oldPage - 1;
      if(prevPage < 0){
        prevPage = data.length - 1;
      } 
      return prevPage;
    })
  };

  const handleNext = () => {
    setPage(oldPage => {
      let nextPage = oldPage + 1;
      if(nextPage > data.length - 1){
        nextPage = 0;
      }
      return nextPage;
    })
  };

  const handlePage = (index) => {
    setPage(index);
  };
  return (
        <>
           <Head>
           <title>News and Notices</title>
           </Head>
           <Heading fontSize="3rem" mb="2rem">News And Notices</Heading>
           <SimpleGrid columns={2} spacing="2rem" mb="5rem">
           {

             news.map((item,i) => (
              <ModalCard key={i} item={item}/>
              ))
           }
           </SimpleGrid>
           <Pagination 
             page={page}
             data={data} 
             handlePage={handlePage} 
             handleNext={handleNext} 
             handlePrev={handlePrev}
           />
        </>
  );
}
