import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";


export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    const orderId = req.params.orderId as string;
    if(!token) return res.status(HTTP_UNAUTHORIZED).send();
    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
       if(typeof decodedUser === 'string') {
            throw new Error('Token không hợp lệ');
       }else {
            req.user_id = decodedUser.user_id;
            req.order_id = orderId;
       }
    } catch (error) {
        res.status(HTTP_UNAUTHORIZED).send();
    }

    return next();
}

// export default (req: any, res: any, next: any) => {
//     const token = req.headers.access_token as string;
//     if(!token) return res.status(HTTP_UNAUTHORIZED).send();

//     try {
//         const decodedUser = verify(token, process.env.JWT_SECRET!);
//         req.user = decodedUser;

//     } catch (error) {
//         res.status(HTTP_UNAUTHORIZED).send();
//     }

//     return next();
// }