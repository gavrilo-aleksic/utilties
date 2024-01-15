import { ISubject } from "./Subject";

export type IMessage = string | number | boolean | Record<any, any>;

export interface ISubscriber {
  onMessage: (callback: (message: IMessage) => any) => void;
  messageCallback: (message: IMessage) => void;
  unsubscribe: () => void;
}

export class Subscriber implements ISubscriber {
  public subject: ISubject | null = null;

  constructor() {}

  setSubject(subject: ISubject) {
    this.subject = subject;
  }

  messageCallback(message: IMessage) {}

  onMessage(callback: (message: IMessage) => any) {
    this.messageCallback = callback;
    return this;
  }

  unsubscribe() {}
}
