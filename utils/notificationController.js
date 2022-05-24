import notifications from "../data/notification.json";
import storeMessages from "../data/storeFingerprint.json";
import * as fs from "fs";
const getAll = () => {
	return notifications;
};

const create = ({fingerprintId,message}) => {
    const notification = {fingerprintId,message};
    notifications.push(notification);
	saveNotification();

};

const del = () => {
	notifications = [];
	saveNotification();
};

const storeFingerprint = (message) => {
    storeMessages.push(message);
    saveFingerprint();
};

const getFingerprintMessages = () => {
	return storeMessages;
};
const deleteFingerprintMsg = (req,res) => {
	storeMessages = [];
	saveFingerprint();
}

function saveNotification(){
	fs.writeFileSync("data/notification.json",JSON.stringify(notifications,null,4));
}
function saveFingerprint(){
	fs.writeFileSync("data/storeFingerprint.json",JSON.stringify(storeMessages,null,4));
}
const notificationController = {
	create,
	del,
	getAll,
	storeFingerprint,
	getFingerprintMessages,
	deleteFingerprintMsg
};
export default notificationController;