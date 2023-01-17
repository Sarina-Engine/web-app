import axios from "axios";

const getProducts = (catId) => axios.get(catId)

export default getProducts