import AddEditStudentForm from "./../../../../components/AddEditStudentForm";
import services from "./../../../../utils/services";
import {STUDENTS_URL} from "./../../../../utils/helpers";
import Layout from "../../../../components/Layout";
import Head from "next/head";
const layout = (props) => {
	return (
		<Layout>
		    <Head><title>Student - Edit</title></Head>
			<AddEditStudentForm props={props}/>
		</Layout>
	);
};
export default layout;

export async function getServerSideProps({params}) {
	const {data:student} = await services.getById(STUDENTS_URL,params.id);
	return {
		props:{
			student
		}
	};
}