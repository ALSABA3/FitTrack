import React, { ChangeEvent, useState } from "react";
import "./Modal.css";
import Select from 'react-select';

interface CategoryName{
  id: number;
  category: string;
}

interface WorkoutName{
  id: number;
  category: string;
  name: string;
}

interface ArrayObjectSelectCategoryName {
  selectedCategoryName: CategoryName | null;
}

interface ArrayObjectSelectWorkoutName {
  selectedWorkoutName: WorkoutName | null;
}

const CategoryNames: CategoryName[] = [
  {
    id: 1,
    category: "Weight Lose",
  },
  {
    id: 2,
    category: "Grow Muscles"
  }
];

const WorkoutNames: WorkoutName[] = [
  {
    id: 1,
    category: "Weight Lose",
    name: "Squats"
  },
  {
    id: 2,
    category: "Grow Muscles",
    name: "Marching in place"
  },
  {
    id: 3,
    category: "Grow Muscles",
    name: "Single knee rotation"
  },
  {
    id: 4,
    category: "Weight Lose",
    name: "Plank"
  },
  {
    id: 5,
    category: "Weight Lose",
    name: "Push-ups"
  },
  {
    id: 6,
    category: "Grow Muscles",
    name: "Pull-ups"
  },
];

interface IModal{
  setOpenModal: Function,
  addWorkoutToday: Function
}

function Modal({ setOpenModal, addWorkoutToday }: IModal) {
  const [categoryName, setCategoryName] = React.useState<ArrayObjectSelectCategoryName>({
    selectedCategoryName: null,
  });
  const [workoutName, setWorkoutName] = React.useState<ArrayObjectSelectWorkoutName>({
    selectedWorkoutName: null,
  });
  const [sets, setSets] = useState<number|null>(null);
  const [reps, setReps] = useState<number|null>(null);
  const [weight, setWeight] = useState<number|null>(null);
  const [duration, setDuration] = useState<number|null>(null);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
          <p>Add today's workout</p>
        </div>
        <div className="modalWorkoutInfo">
          
          <div className="Info">
            <p>Choose category:</p>
            <Select
              value={categoryName.selectedCategoryName}
              onChange={(option: CategoryName | null) => {
                setCategoryName({ selectedCategoryName: option });
              }}
              getOptionLabel={(categoryName: CategoryName) => categoryName.category}
              getOptionValue={(categoryName: CategoryName) => categoryName.category}
              options={CategoryNames}
              isClearable={true}
              backspaceRemovesValue={true}
            />
          </div>
          <div className="Info">
            <p>Choose workout name:</p>
            <Select
              value={workoutName.selectedWorkoutName}
              onChange={(option: WorkoutName | null) => {
                setWorkoutName({ selectedWorkoutName: option });
              }}
              getOptionLabel={(workoutName: WorkoutName) => workoutName.name}
              getOptionValue={(workoutName: WorkoutName) => workoutName.name}
              options={WorkoutNames.filter((categoryWorkout)=>{
                if(categoryWorkout.category === categoryName.selectedCategoryName?.category){
                  return categoryWorkout;
                }
              })}
              isClearable={true}
              backspaceRemovesValue={true}
            />
          </div>
          <div className="Info">
            <p>Add sets:</p>
            <input type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>)=> setSets(e.target.valueAsNumber)}
              value={sets ?? ''} 
              placeholder="Your sets.."
            />
          </div>
          <div className="Info">
            <p>Add reps:</p>
            <input type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>)=> setReps(e.target.valueAsNumber)}
              value={reps ?? ''} 
              placeholder="Your reps.."
            />
          </div>
          <div className="Info">
            <p>Add weight:</p>
            <input type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>)=> setWeight(e.target.valueAsNumber)}
              value={weight ?? ''} 
              placeholder="Your weight.."
            />
          </div>
          <div className="Info">
            <p>Add duration:</p>
            <input type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>)=> setDuration(e.target.valueAsNumber)}
              value={duration ?? ''} 
              placeholder="Your duration.."
            />
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
              addWorkoutToday({
                category: categoryName.selectedCategoryName?.category, 
                name:workoutName.selectedWorkoutName?.name, 
                sets, 
                reps, 
                weight, 
                duration
              });
            }}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
