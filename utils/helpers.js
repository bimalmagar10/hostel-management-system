const sidebarContents = [
	{
		title:"News and Notices",
		slug:"news-and-notices",
		items:null,
		hasToggle:false
	},
	{
		title:"Room Management",
		slug:"#",
		items:[
		   {
		   	title:"Add Room",
		   	slug:"/room-management/add-room"
		   },
		   {
		   	title:"Block A",
		   	slug:"/room-management/block/A"
		   },
		   {
		   	title:"Block B",
		   	slug:"/room-management/block/B"
		   },
		   {
		   	title:"Block C",
		   	slug:"/room-management/block/C"
		   },
		   {
		   	title:"Block D",
		   	slug:"/room-management/block/D"
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
		 	slug:"/students/student-register"
		 },
		 {
		 	title:"Computer Engineering",
		 	slug:"/students/student-management/BCT"
		 },
		 {
		 	title:"Electronics and Communication Engineering",
		 	slug:"/students/student-management/BEX"
		 },
		 {
		 	title:"Civil Engineering",
		 	slug:"/students/student-management/BCE"
		 }
		],
		hasToggle:true
	},
	{
		title:'Student Details',
		slug:'student-details',
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
		name:'student-1'
	},
	{
		label:'Student Two',
		name:'student-2'
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
		label:'Fingerprint',
		name:'fingerprint'
	},
	{
	    label:"Parent's Name",
	    name:'pname'
	}
];
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


export {sidebarContents,newsAndNotices,newsUrl,FormItems,StudentRegisterFields,facultyOptions};