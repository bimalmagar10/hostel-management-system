import Layout from "../../components/Layout";
import {verify} from "jsonwebtoken";
import {promisify} from "util";
import {verificationStatus} from "../../utils/helpers";
import Head from "next/head";
export default function Home() {
  setInterval(() => {
    if(verificationStatus.length !== 0){
      console.log(verificationStatus);
    }
    
  },1000);
  return (
   <Layout>
     <Head>
      <title>Home</title>
     </Head>
     This site is designed by HWMS Team BEX 074!
   </Layout>
  )
}
