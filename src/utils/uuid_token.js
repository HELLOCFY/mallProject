import {v4 as uuidv4} from 'uuid'
//生成一个唯一的字符串
export const getUUID=()=>{
    //先找本地是否有uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
        //我生成游客临时身份
        uuid_token=uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}