import { ErrorCode, HttpException } from "./root";



export class NotFoundException extends HttpException{
    constructor(message:string, error:any, errorCode:ErrorCode){
        super(message, 404, errorCode, error);
    }
}