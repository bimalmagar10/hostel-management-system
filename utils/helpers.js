 const facultyOptions = [
	{
		option:'Electronics and Communication Engineering',
		value:'BEX'
	},
	{
		option:'Computer Engineering',
		value:'BCT'
	},
	{
		option:'Civil Engineering',
		value:'BCE'
	},
    {
    	option:'Geomatics Engineering',
    	value:'BGE'
    },
    {
    	option:'Mechanical Engineering',
    	value:'BME'
    },
    {
    	option:'Automobile Engineering',
    	value:'BAM'
    },
    {
    	option:'Electrical Engineering',
    	value:'BEL'
    }
];
const sidebarContents = [
	{
		title:"News and Notices",
		slug:"dashboard/news-and-notices",
		items:null,
		hasToggle:false
	},
	{
		title:"Room Management",
		slug:"#",
		items:[
		   {
		   	title:"Add Room",
		   	slug:"/dashboard/room-management/add-room"
		   },
		   {
		   	title:"Block A",
		   	slug:"/dashboard/room-management/block/A"
		   },
		   {
		   	title:"Block B",
		   	slug:"/dashboard/room-management/block/B"
		   },
		   {
		   	title:"Block C",
		   	slug:"/dashboard/room-management/block/C"
		   },
		   {
		   	title:"Block D",
		   	slug:"/dashboard/room-management/block/D"
		   }
		],
		hasToggle:true
	},
	{
		title:'Students',
		slug:'students',
		items:[
		 {
		 	title:"Add student",
		 	slug:"/dashboard/students/student-register"
		 },
		 ...studentItems()
		],
		hasToggle:true
	},
	{
		title:'Student Details',
		slug:'dashboard/student-details',
		items:null,
		hasToggle:false
	},
	{
		title:'Student Verification',
		slug:'dashboard/student-validation',
		items:null,
		hasToggle:false
	},
	{
		title:'Reset Fingerprint Sensor',
		slug:'dashboard/reset-sensor',
		items:null,
		hasToggle:false
	}
];


const newsAndNotices = [
	{
		"label":"Student Issues",
		"title":"Hostel facility is currently unavailable",
		"date":"December 9,2021",
		"description":`There has been a drastic change in the toilet due to the 
		increment in the hostelers.So proper toilets management and 
		manintainence is necessary.Please help us poo silently and 
		peacefully as per our need.This has to be fixed as soon as 
		possible.`
	},
	{
		"label":"Hostel Notice",
		"title":"Pooja program for saraswati pooja",
		"date":"December 10,2021",
		"description":`Hello World how are you`
	},
	{
		"label":"Mess Notice",
		"title":"Chicken Tomorrow",
		"date":"January 1,2022",
		"description":`Hi bimal Thapa Magar.What you doin' mate?`
	}
];

const newsUrl=`https://my-json-server.typicode.com/bimalmagar10/json-api/news`;

const FormItems = [
	{
		label:"Room Name",
		name:"roomName"
	},
	{
		label:"Block Name",
		name:"blockName"
	},
	{
		label:'Tables',
		name:"tables"
	},
	{
		label:'Beds',
		name:'beds'
	},
	{
		label:'Chairs',
		name:'chairs'
	},
	{
		label:'Wardrobe',
		name:'wardrobe'
	},
	{
		label:'Student one',
		name:'students[0]'
	},
	{
		label:'Student Two',
		name:'students[1]'
	}
];

//For the student register form fields
const StudentRegisterFields = [
	{
		label:'Full Name',
		name:'fullname'
	},

	{
		label:'Roll Number',
		name:'rollno'
	},
	{
		label:'Date of birth',
		name:'dob'
	},
	{
		label:'Phone Number',
		name:'phone'
	},
	{
		label:"Parent's Phone Number",
		name:'pphone'
	},
	{
		label:'E-mail',
		name:'email'
	},
	{
		label:'Address',
		name:'address'
	},
	{
	    label:"Father's Name",
	    name:'fathersName'
	},
	{
		label:"Mother's Name",
		name:"mothersName"
	}
];
const updateSettings = [
	{
		id:"currentPassword",
		placeholder:"Current password",
	},
	{
		id:"password",
		placeholder:'Password'
	},
	{
		id:"confirmPassword",
		placeholder:'Confirm password'
	}
];

const roomEditFields = ["roomName","blockName","tables","beds","chairs","wardrobe","students"];
const ROOM_URL = "http://localhost:3000/api/room-management";
const STUDENTS_URL = "http://localhost:3000/api/student-management";
const AUTH_URL_LOGIN = "http://localhost:3000/api/auth/login";
const AUTH_URL_LOGOUT = "http://localhost:3000/api/auth/logout";
const AUTH_URL_ADMIN = "http://localhost:3000/api/auth/admin"
const stdEditFields = ["fullname","dob","rollno","phone","pphone","email","address",
"fathersName","mothersName","faculty","fingerprint",];

function studentItems(){
	return facultyOptions.map(opt => {
		return {
			title:opt.option,
			slug:`/dashboard/students/student-management/${opt.value}`
		}
	})
	
}
let verificationStatus = [];


export {
	sidebarContents,
	newsAndNotices,newsUrl,
	FormItems,StudentRegisterFields,
	facultyOptions,roomEditFields,
	ROOM_URL,
	STUDENTS_URL,
	stdEditFields,
	AUTH_URL_LOGIN,
	AUTH_URL_LOGOUT,
	updateSettings,
	AUTH_URL_ADMIN,
	verificationStatus
};


