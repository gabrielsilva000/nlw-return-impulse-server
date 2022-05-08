import express from 'express'
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fas574f9as67",
        pass: "fg74s9zd7gg9"
    }
})

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screeenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbacksRepository,
            nodemailerMailAdapter
    )
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screeenshot,
    });
    // const feedback = await prisma.feedback.create({
    //     data:{
    //         type: type,
    //         comment: comment,
    //         screeenshot: screeenshot,
    //     }
    // })

    // await transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'Chips <batata@gmail.com>',
    //     subject: 'Novo feedback',
    //     html: [
    //         `<p></p>`,
    //         `<p></p>`,
    //     ].join('')
    // });

    return res.status(201).send();
});