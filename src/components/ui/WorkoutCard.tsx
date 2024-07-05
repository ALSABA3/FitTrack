import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid #40404020;
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px #007aff15;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: #007aff;
  font-weight: 500;
  background: #007aff20;
  padding: 4px 10px;
  border-radius: 8px;
`;
const Name = styled.div`
  font-size: 20px;
  color: #404040;
  font-weight: 600;
`;
const Sets = styled.div`
  font-size: 15px;
  color: #4d4c4c;
  font-weight: 500;
  display: flex;
  gap: 6px;
`;
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Details = styled.div`
  font-size: 15px;
  color: #404040;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

interface Workout {
  _id: string;
  category: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
}

const WorkoutCard = ({
  category,
  name,
  sets,
  reps,
  weight,
  duration,
}: Workout) => {
  return (
    <Card>
      <Category>{category}</Category>
      <Name>{name}</Name>
      <Sets>
        Count: {sets} sets X {reps} reps
      </Sets>
      <Flex>
        <Details>{weight} kg</Details>
        <Details>{duration} min</Details>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
