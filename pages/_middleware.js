import {NextResponse} from "next/server";
import {verify} from "jsonwebtoken";
export default function middleware(req){
     const {cookies} = req;
     const token = cookies.MyJWT;
     const url = req.url;
     if(url === "/" || url.includes("/dashboard")){
     	if(token === undefined){
     		return NextResponse.redirect("/auth/login");
     	}
          try {
               const user = verify(token,process.env.SECRET_KEY);
               return NextResponse.next();
          } catch(err){
               return NextResponse.redirect("/auth/login");
          }
     } else if(url.includes("/login")){
           if(token){
               try {
                   verify(token,process.env.SECRET_KEY);
                   return NextResponse.redirect("/dashboard");
               }catch(err){
                   return NextResponse.next();
               }
         } 
     } else {
          return NextResponse.next();
     }
   
}