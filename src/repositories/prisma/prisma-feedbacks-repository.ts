import{ prisma } from "../../prisma";
import{ FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository{
 async create({ type, comment, screeenshot }: FeedbackCreateData){
    await prisma.feedback.create({
      data:{
        type,
        comment,
        screeenshot,
      }
    });
 }
}