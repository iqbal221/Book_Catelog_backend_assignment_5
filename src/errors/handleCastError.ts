import mongoose from "mongoose"
import { IGenericErrorMessage } from "../interface/error"

const handleCastError=(err:mongoose.Error.CastError)=>{

    const errors:IGenericErrorMessage[] = [
        {
            path:err?.path,
            message:err?.message
        }
    ]

    const statusCode = 400
    return {
        statusCode,
        message:'Invalid Error',
        errorMessages:errors
    }
}

export default handleCastError;