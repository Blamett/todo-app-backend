import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NodemailerService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async recoveryPassword(email: string) {

        const userEmail = await this.userService.findByEmail(email)

        if (userEmail) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'noreply.todoapp123@gmail.com',
                    pass: 'Todoapp@123'
                }
            });

            const user = await this.userService.returnId(email);

            let payload = {
                id: user.id,
            };

            let token = this.jwtService.sign(payload);

            transporter.sendMail({
                from: '"TodoApp" <no-reply@todoapp.net>',
                to: `${email}`,
                subject: "Recovery Password",
                text: `token: ${token}`,
            }).catch(err => console.error(err));

        }
    }
}
