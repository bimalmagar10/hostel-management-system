import roomDatas from "../data/room-management.json";
import studentDatas from "../data/student-management.json";
import * as fs from "fs";
function getAll() {
	return roomDatas;
}

function createRoom({roomName,blockName,tables,chairs,wardrobe,beds,students}) {
	const room = {roomName,blockName,tables,chairs,beds,wardrobe,students};
    
	//Unique room validation
	if(roomDatas.find(x => x.roomName.toString() === room.roomName.toString())){
		throw `Room with the name ${room.roomName} already exists`;
	}

	//add room id 
	room.id = roomDatas.length ? Math.max(...roomDatas.map(x => x.id)) + 1:1;

	//convert to lowercase 
	room.students.forEach((std,i) => {
      room.students[i] = room.students[i].toLowerCase();
	})

	//add created and update date
	room.dateCreated = new Date().toISOString();
	room.dateUpdated = new Date().toISOString();
     
    roomDatas.push(room);
    saveRoom();

}

function deleteRoom(id){
   roomDatas = roomDatas.filter(room => room.id.toString() !== id.toString());
   saveRoom();

}
function getById(id) {
	const room = roomDatas.find(room => room.id.toString() === id.toString());
	return room;
}


function updateRoom(id,{roomName,blockName,tables,beds,chairs,wardrobe,students}){
   const params = {roomName,blockName,tables,beds,chairs,wardrobe,students};
   const room = roomDatas.find(x => x.id.toString() === id.toString());

   //validation for unique rooms
   if((room.roomName !== params.roomName) && roomDatas.find(x => x.roomName === params.roomName)){
   	throw `Room already with room name ${params.roomName} exists`;
   }
   
   room.dateUpdated = new Date().toISOString();
   
   Object.assign(room,params);
   saveRoom();

}


function saveRoom(){
	fs.writeFileSync('data/room-management.json',JSON.stringify(roomDatas,null,4));
}

const roomController = {
	getAll,
	createRoom,
	deleteRoom,
	getById,
	updateRoom
};

//Student management section
function getAllStudents(){
	return studentDatas;
}

function createStudent({fullname,rollno,dob,phone,pphone,email,address,
fingerprint,fathersName,mothersName,faculty}){
   const student = {fullname,rollno,dob,phone,pphone,email,address,
	fingerprint,fathersName,mothersName,faculty};

	//unique email validation
	if(studentDatas.find(std => std.email.toString() === student.email.toString()))
		throw `User with email ${student.email} already exists`;
	if(studentDatas.find(std => std.rollno.toString() === student.rollno.toString()))
		throw `Student with rollno ${student.rollno} already exists`;

	student.id = studentDatas.length? Math.max(...studentDatas.map(std => std.id)) + 1:1;

	//registered and updated date
	student.dateCreated = new Date().toISOString();
	student.dateUpdated = new Date().toISOString();

	studentDatas.push(student);
	saveStudent();

}

function deleteStudent(id){
   studentDatas = studentDatas.filter(std => std.id.toString() !== id.toString());
   saveStudent();
}

function getStudentById(id){
   return studentDatas.find(std => std.id.toString() === id.toString());
}

function updateStudent(id,{fullname,rollno,dob,phone,pphone,email,address,
fingerprint,fathersName,mothersName,faculty}){
	const params = {fullname,rollno,dob,phone,pphone,email,address,
	fingerprint,fathersName,mothersName,faculty};
	const student = studentDatas.find(std => std.id.toString() === id.toString());

	//unique validation to check whether the user's email is already registered or not
	if(params.email !== student.email && studentDatas.find(std => std.email === params.email))
		throw `User with email ${params.email} already exists!!`;

	//only update the dateUpdated
	student.dateUpdated = new Date().toISOString();

	Object.assign(student,params);
	saveStudent();

}

function saveStudent(){
	fs.writeFileSync('data/student-management.json',JSON.stringify(studentDatas,null,4));
}

const studentController = {
	getAllStudents,
	createStudent,
	deleteStudent,
	getStudentById,
	updateStudent
};

export {roomController,studentController};