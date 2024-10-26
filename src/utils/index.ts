import { Data } from "../types";

export const getDayInWeek = (dayInWeek: number) => {
  const dayCurrent = new Date().getDay();
  const rangeDay = dayCurrent - dayInWeek;
  const date = new Date().getDate() - rangeDay;
  return date;
};

export const generateUniId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

export const mockups: Data[] = [
  {
    id: 1,
    day: "MON",
    workouts: [],
  },
  {
    id: 2,
    day: "TUE",
    workouts: [
      {
        id: generateUniId(),
        name: "Chest Day - with Arm exercises",
        exercises: [
          {
            id: generateUniId(),
            name: "Bench Press Medium Grip",
            numberOfSet: "3x",
            detail: "50 lb x 5, 60 lb x 5",
          },
          {
            id: generateUniId(),
            name: "Exercise B",
            numberOfSet: "1x",
            detail: "40 lb x 10",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    day: "WED",
    workouts: [
      {
        id: generateUniId(),
        name: "Leg Day",
        exercises: [
          {
            id: generateUniId(),
            name: "Exercise C",
            numberOfSet: "1x",
            detail: "30 lb x 6",
          },
          {
            id: generateUniId(),
            name: "Exercise D",
            numberOfSet: "1x",
            detail: "40 lb x 4",
          },
          {
            id: generateUniId(),
            name: "Exercise E",
            numberOfSet: "1x",
            detail: "50 lb x 5",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    day: "THU",
    workouts: [],
  },
  {
    id: 5,
    day: "FRI",
    workouts: [],
  },
  {
    id: 6,
    day: "SAT",
    workouts: [],
  },
  {
    id: 7,
    day: "SUN",
    workouts: [],
  },
];
