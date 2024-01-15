import { IMessage, ISubscriber, Subscriber } from "./Subscriber";

export interface ISubject {
  subscribers: ISubscriber[];
  emit: (message: IMessage) => void;
  close: () => void;
  subscribe: ({
    onMessage,
  }: {
    onMessage: ISubscriber["onMessage"];
  }) => ISubscriber;
}

export class Subject implements ISubject {
  subscribers: ISubscriber[] = [];

  emit(message: any) {
    this.subscribers.forEach((subscriber) =>
      subscriber.messageCallback(message)
    );
  }

  subscribe() {
    const subscriber = new Subscriber();
    subscriber.setSubject(this);
    this.subscribers.push(subscriber);
    return subscriber;
  }

  close() {}
}

const subject = new Subject();
const subscriber = subject
  .subscribe()
  .onMessage((message) => console.log(message));

console.log("Starting");

setInterval(() => {
  subject.emit("hey");
}, 500);
