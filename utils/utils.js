import {useState,useEffect} from "react";
import {newsUrl} from "./helpers";
//For pagination section

const paginate = (news) => {
    const newsPerPage = 6;
    const numberOfPages = Math.ceil(news.length / newsPerPage);

    const paginatedPages = Array.from({length:numberOfPages},(_,index) => {
    	const start = index * newsPerPage;
    	return news.slice(start,start + newsPerPage);
    }) ;
    return paginatedPages;
};

const useFetch = () => {
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState([]);

    const getNews =  async () => {
    	try{
    		 const response = await fetch(newsUrl);
    	     const data = await response.json();
    	     setData(paginate(data));
    	} catch(error){
    		console.error("Oops!! something bad has happened");
    	}
    	setLoading(false);
    };

    useEffect(() => {
    	getNews();
    }, [])
   
   return {data,loading};
};

export {useFetch};