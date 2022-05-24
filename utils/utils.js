import {useState,useEffect} from "react";
import {newsUrl} from "./helpers";
import {ROOM_URL,STUDENTS_URL,facultyOptions} from "./helpers";
import services from "./services";
import {verify} from "jsonwebtoken";
//For pagination section

const paginate = (news,perPage) => {
    const newsPerPage = perPage;
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
    	     setData(paginate(data,6));
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

const filterAccordingToBlock =(rooms,blockName) =>{
      const newRooms =  rooms.filter(room => room.blockName.toLowerCase() === blockName.toLowerCase());
      return newRooms;
};

const findStudent = async (query) => {
    try {
        const {data:rooms} = await services.getAll(ROOM_URL);
        const {data:students} = await services.getAll(STUDENTS_URL);
        const student = students.find(std => std.rollno.toLowerCase() === query.toLowerCase());
        if(!student){
            throw 'Student may not be registered';
        }
        const [room] = rooms.filter(room => room.students.includes(student.rollno.toLowerCase()));
        if(!room){
            throw 'Student may not be registered';
        }
        const newDB={
            student,
            room
        };

        if(!rooms || !students){
            throw `Couldn't process the requested search`;
        }
        return newDB;
    } catch(error) {
        throw error;
    }
};
const elongateFaculty = (abbreviated) => {
    const [{option}]= facultyOptions.filter(x => x.value.toString() === abbreviated.toString());
    return option;
};
const decodeCookie = (token) => {
    const user = verify(token,process.env.NEXT_PUBLIC_SECRET_KEY);
    return user;
};

export {useFetch,filterAccordingToBlock,findStudent,elongateFaculty,paginate,decodeCookie};
