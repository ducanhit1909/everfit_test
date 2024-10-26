export interface Exercise {
  id: string;
  name: string;
  numberOfSet: string;
  detail: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Data {
  id: number;
  day: string;
  workouts: Workout[];
}