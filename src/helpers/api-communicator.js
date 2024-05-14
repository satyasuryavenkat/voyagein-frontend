import axios from "axios";
import { BASE_URL } from "../utils/config";


export const sendChatRequest = async (message) => {
  const res = await axios.post(`${BASE_URL}/chat/new`, message);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get(`${BASE_URL}/chat/all-chats`);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete(`${BASE_URL}/chat/delete`);
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

