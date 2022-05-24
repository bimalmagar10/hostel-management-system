import fetchWrapper from "./fetch-wrapper";
const roomUrl = "http://localhost:3000/api/room-management";
function getAll(url) {
	return fetchWrapper.get(url);
}

function create(url,params) {
	return fetchWrapper.post(url,params);
}

function _delete(url,id){
   return fetchWrapper.delete(`${url}/${id}`);
}

function getById(url,id) {
	return fetchWrapper.getById(`${url}/${id}`);
}
function update(url,id,params){
    return fetchWrapper.put(`${url}/${id}`,params);
}

const services = {
	getAll,
	create,
	getById,
	update,
	delete:_delete
};
export default services;