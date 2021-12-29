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
		items:['Add Room','Block A','Block B','Block C'],
		hasToggle:true
	},
	{
		title:'Students',
		slug:'students',
		items:[
		'Computer Engineering',
		'Electronics and Communication Engineering',
		'Civil Engineering'
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

export {sidebarContents,newsAndNotices};