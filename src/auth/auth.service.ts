import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService {
        signin() {
                return 'I am signing in';
        }

        signup(){
                return 'I am signing up';
        }
}
