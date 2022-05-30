import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
    constructor(private readonly userService: UserService) { }

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

            transporter.sendMail({
                from: '"TodoApp" <no-reply@todoapp.net>',
                to: `${email}`,
                subject: "Recovery Password",
                text: "...",
            }).catch(err => console.error(err));

        }
    }
}
