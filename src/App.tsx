import { useState } from "react";
import "./App.css";
import { Container, Draggable, DropResult } from "react-smooth-dnd";
import { generateUniId, mockups } from "./utils";
import { Data, Exercise, Workout } from "./types";
import IconPlus from "./assets/icons/plus.svg";
import IconDot from "./assets/icons/dot.svg";

function App() {
  const [data, setData] = useState<Data[]>(mockups);

  const onAddNewWorkout = (idx: number) => {
    const newData = data.map((item: Data, index: number) => {
      if (idx === index) {
        const newWorkout: Workout = {
          id: generateUniId(),
          name: `Workout default name ${item.workouts.length + 1}`,
          exercises: [],
        };
        return {
          ...item,
          workouts: [...item.workouts, newWorkout],
        };
      }
      return item;
    });
    setData(newData);
  };

  const applyDrag = (arr: any[], dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex === null && addedIndex === null) return arr;
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  };

  const onDropExercise = (idxData: number, idxWk: number, e: DropResult) => {
    const newData = [...data];
    newData[idxData].workouts[idxWk].exercises = applyDrag(
      newData[idxData].workouts[idxWk].exercises,
      e
    );
    setData(newData);
  };

  const getChildPayloadExercise = (
    idxData: number,
    idxWk: number,
    index: number
  ) => {
    const item = data?.[idxData].workouts.filter((_, i) => i === idxWk)[0]
      .exercises[index];
    return item;
  };

  const onAddNewExercise = (idData: number, idWorkout: string) => {
    const newData = data.map((item) => {
      if (idData === item.id) {
        const newWorkouts = item.workouts.map((wks, idx) => {
          if (idWorkout === wks.id) {
            const newExercises: Exercise = {
              id: generateUniId(),
              name: `Exercise default name ${wks.exercises.length + 1}`,
              numberOfSet: "1x",
              detail: "40 lb x 10",
            };
            return {
              ...wks,
              exercises: [...wks.exercises, newExercises],
            };
          }
          return wks;
        });
        return { ...item, workouts: newWorkouts };
      }
      return item;
    });
    setData(newData);
  };

  const onDropWorkout = (idxData: number, e: DropResult) => {
    const newItems = [...data];
    newItems[idxData].workouts = applyDrag(newItems[idxData].workouts, e);
    setData(newItems);
  };

  const getChildPayloadWorkout = (idxData: number, idxWk: number) => {
    const item = data?.filter((_, i) => i === idxData)[0]?.workouts[idxWk];
    return item;
  };

  return (
    <Container>
      <div className="container">
        {data.map((item: Data, idx: number) => {
          return (
            <div className="container-column" key={idx}>
              <span className="day-name">{item.day}</span>
              <div className="column">
                <div
                  className={`content ${
                    item.workouts.length > 0 ? "" : "empty"
                  }`}
                >
                  <div className="column-title">
                    <span
                      className={`day-number ${
                        new Date().getDate() === item.dayNumber && "day-active"
                      }`}
                    >
                      {item.dayNumber}
                    </span>
                    <img
                      src={IconPlus}
                      alt="icon plus"
                      className="add-wks"
                      onClick={() => onAddNewWorkout(idx)}
                    />
                  </div>
                  <div className="container-workout">
                    <Container
                      groupName="workout"
                      onDrop={(e) => onDropWorkout(idx, e)}
                      getChildPayload={(e) => getChildPayloadWorkout(idx, e)}
                      {...({} as any)}
                    >
                      {item.workouts.map((wks, idxWk) => {
                        return (
                          <Draggable key={wks.id} {...({} as any)}>
                            <div className="workount">
                              <div className="work-name">
                                <span title={wks.name}>{wks.name}</span>
                                <img src={IconDot} alt="icon dot" />
                              </div>
                              <Container
                                groupName="exercise"
                                onDrop={(e) => onDropExercise(idx, idxWk, e)}
                                getChildPayload={(e) =>
                                  getChildPayloadExercise(idx, idxWk, e)
                                }
                                {...({} as any)}
                              >
                                {wks.exercises.map((ex) => (
                                  <Draggable key={ex.id} {...({} as any)}>
                                    <div className="exercise">
                                      <div className="exercise-name">
                                        {ex.name}
                                      </div>
                                      <div className="exercise-info">
                                        <span className="exercise-number-of-set">
                                          {ex.numberOfSet}
                                        </span>
                                        <span className="exercise-detail">
                                          {ex.detail}
                                        </span>
                                      </div>
                                    </div>
                                  </Draggable>
                                ))}
                              </Container>
                              <img
                                src={IconPlus}
                                className="add-exercise"
                                alt="icon plus"
                                onClick={() =>
                                  onAddNewExercise(item.id, wks.id)
                                }
                              />
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default App;
