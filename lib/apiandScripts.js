import axios from "axios";
import { generateOTP } from "../utils";
import NetInfo from "@react-native-community/netinfo"


   
const getOtp = async (phone) => {
    try {
        let res =  await axios.post("", {
            phone,
            otp: generateOTP()
        })
    } catch (error) {
        console.log(error);
    }
} 