import { sendDelete, sendGet, sendPost, sendPut } from "../../axios";
const getAllClassrooms = async () => await sendGet("teacher/classroom");

export { getAllClassrooms };
