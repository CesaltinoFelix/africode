export class Ticket {
  id: string;
  number: string;
  position: number;
  status: string;
  userId: string;
  queueId: string;
  calledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
