import { Subject } from "./Subject";

describe("[Observables]", () => {
  test("Should correctly create subject and subscriber", () => {
    const subject = new Subject();
    subject.subscribe().onMessage((message) => console.log(message));
  });
});
