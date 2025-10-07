import "./style.css";
import Contactlist from "./components/contactList/contactList.js";

const contactList = new Contactlist({
  elt: "#app",
  apiURL: "https://68e45a248e116898997b9df1.mockapi.io/firstname/",
});
window.contactList = contactList;
