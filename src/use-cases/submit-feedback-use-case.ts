import { MailAdapter } from "../adapters/mail-adapter";
import{FeedbacksRepository}from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
  type: string;
  comment: string;
  screeenshot ?: string;
}

export class SubmitFeedbackUseCase{
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest){
    const{type, comment, screeenshot} = request;

   await this.feedbacksRepository.create({
      type,
      comment,
      screeenshot,
    })

    await this.mailAdapter.sendMail ({
        subject: 'Novo feedback',
        body:[
         `<div style="font-fanily: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
          screeenshot?'<ing src="${screenshot}" />' : null,
          `</div>`
        ].join('\n')
      })
  }
}