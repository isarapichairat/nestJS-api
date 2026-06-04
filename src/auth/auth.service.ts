import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
        constructor(private prisma: PrismaService) {
        }
        async signup(dto: AuthDto) {
                try {
                // Generate the password hash
                const hash = await argon.hash(dto.password);

                // Save the new user in the database
                const user = await this.prisma.user.create({
                        data: {
                                email: dto.email,
                                hash,
                        },
                });
                const { hash: _, ...userWithoutHash } = user;

                // Return the saved user
                return userWithoutHash;
                } catch (error) {
                        if (error instanceof PrismaClientKnownRequestError) {
                                if (error.code === 'P2002') {
                                        throw new ForbiddenException('Credentials taken');
                                }
                        }
                        throw error;
                }
        }

        async signin(dto: AuthDto) {

                //find the user by email
                const user = 
                await this.prisma.user.findUnique({
                        where: {
                                email: dto.email,
                        }
                });

                //if user does not exist throw exception
                if (!user) {
                        throw new ForbiddenException('Credentials incorrect');
                }

                //compare password
                const pwMatches = await argon.verify(user.hash, dto.password);

                //if password incorrect throw exception
                if (!pwMatches) {
                        throw new ForbiddenException('Credentials incorrect');
                }
                
                //send back the user
                const { hash: _, ...userWithoutHash } = user;
                return userWithoutHash;

        }
}
