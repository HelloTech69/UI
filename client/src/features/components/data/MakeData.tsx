import { faker } from "@faker-js/faker";
import { format } from "date-fns";

import { IPost } from "~features/interfaces";

const range = (len: number) => {
  const arr = [];
  for (let num = 0; num < len; num++) {
    arr.push(num);
  }
  return arr;
};

let currentId = 0;

const generateIncrementingId = () => {
  return ++currentId;
};

const newPost = (): IPost => {
  const randomDate = faker.date.anytime();

  return {
    id: generateIncrementingId(),
    title: faker.lorem.words(2),
    content: faker.lorem.sentences(2),
    status: faker.helpers.shuffle<IPost["status"]>([
      "published",
      "draft",
      "rejected",
    ])[0]!,
    category: { id: faker.number.int({ min: 1, max: 10 }) },
    createdAt: format(randomDate, "MMMM d, yyyy h:mm a"),
  };
};

export default function makeData(...lens: number[]): IPost[] {
  currentId = 0;
  const makeDataLevel = (depth = 0): IPost[] => {
    const len = lens[depth];
    return range(len).map(() => {
      return newPost();
    });
  };

  return makeDataLevel();
}
