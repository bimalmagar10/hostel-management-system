function get(url) {
	const requestOptions = {
		method:"GET"
	};
	return fetch(url,requestOptions).then(handleResponse);
}

function post(url,body){
    const requestOptions = {
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify(body)
	};
	return fetch(url,requestOptions).then(handleResponse);
}

function _delete(url){
    const requestOptions = {
    	method:'DELETE'
    };
    return fetch(url,requestOptions).then(handleResponse);
}

function getById(url) {
    const requestOptions = {
    	method:'GET'
    };
    return fetch(url,requestOptions).then(handleResponse);
}

function put(url,body){
	const requestOptions = {
		method:'PATCH',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify(body)
	};
	return fetch(url,requestOptions).then(handleResponse);
}

function handleResponse(res) {
		return res.text().then(text => {
			const data = text && JSON.parse(text);
			if(!res.ok) {
     			throw  new Error(data.msg ?? res.statusText);
			}
         return data;
		});
		
}
const fetchWrapper = {
   get,
   post,
   getById,
   put,
   delete:_delete
};

export default fetchWrapper;