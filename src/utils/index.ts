import { Data } from "../types";

const getThisWeekDates = () => {
  const weekDates = [];
  const today = new Date();
  const dayOfWeek = today.getDay();

  for (let i = 1; i <= 7; i++) {
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek + i);
    weekDates.push(firstDayOfWeek.getDate());
  }

  return weekDates;
};

export const generateUniId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

export const mockups: Data[] = [
  {
    id: 1,
    day: "MON",
    workouts: [],
    dayNumber: getThisWeekDates()[0],
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
    dayNumber: getThisWeekDates()[1],
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
    dayNumber: getThisWeekDates()[2],
  },
  {
    id: 4,
    day: "THU",
    workouts: [],
    dayNumber: getThisWeekDates()[3],
  },
  {
    id: 5,
    day: "FRI",
    workouts: [],
    dayNumber: getThisWeekDates()[4],
  },
  {
    id: 6,
    day: "SAT",
    workouts: [],
    dayNumber: getThisWeekDates()[5],
  },
  {
    id: 7,
    day: "SUN",
    workouts: [],
    dayNumber: getThisWeekDates()[6],
  },
];
