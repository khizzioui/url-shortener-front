import axios from "axios"
import {API_URL} from '../env'

export default async function  getstats() {
    //console.log(url)
   let response  = await axios.get(API_URL+'/stats');
   return response.data
}