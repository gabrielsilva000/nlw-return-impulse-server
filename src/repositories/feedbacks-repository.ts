export interface FeedbackCreateData{
    type: string;
    comment: string;
    screeenshot?: string;
}
  export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
  }