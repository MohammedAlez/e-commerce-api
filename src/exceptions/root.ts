export class HttpException extends Error {
    message:string;
    status:number;
    errorCode:any;
    errors:ErrorCode

    constructor(message:string, status:number, errors:ErrorCode, errorCode:any){
        super(message);
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
        this.errors = errors
    }
}


export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXIST = 1002,
    INCORRECT_PASSWORD = 1003,
    UNAUTHORIZED = 1004,
    PRODUCT_NOT_FOUND = 1001,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001
}