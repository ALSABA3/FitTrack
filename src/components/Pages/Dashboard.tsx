import styled from "styled-components";
import CountsCard from "@/components/ui/CountsCard";
import WorkoutCard from "@/components/ui/WorkoutCard";
import WorkOuts from "@/components/WorkOuts";
import { useEffect, useState } from "react";

interface IWorkout {
  _id: string;
  category: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
}

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
`;

// const Title = styled.div`
//   padding: 0px 16px;
//   font-size: 22px;
//   color: #404040;
//   font-weight: 500;
// `;

// const Button = styled.button`
//   border: none;
//   display: inline-block;
//   padding: 8px 16px;
//   vertical-align: middle;
//   overflow: hidden;
//   text-decoration: none;
//   color: white;
//   text-font: bold;
//   background-color: inherit;
//   text-align: center;
//   cursor: pointer;
//   white-space: nowrap;
//   background-color: #009688;
// `;

const Dashboard = () => {
  // const [modalOpen, setModalOpen] = useState(false);
  const [workoutsToday, setWorkoutsToday] = useState<IWorkout[]>([]);

  async function getWorkoutsToday() {
    console.log("hi");
  }

  // async function addWorkoutToday() {
  //   console.log("hi");
  // }

  useEffect(() => {
    getWorkoutsToday();
  }, []);

  return (
    <>
      <section className="flex flex-col mt-20">
        <h2 className="text-5xl font-semibold mb-7 text-center">Dashboard</h2>
        <Container>
          <Wrapper>
            <FlexWrap>
              <CountsCard
                title="Calories Burned"
                description="Total calories burned today"
                value={12000}
                unit="kcal"
              />
              <CountsCard
                title="Workouts"
                description="Total number of workouts for today"
                value={5}
                unit=""
              />
              <CountsCard
                title="Average Calories Burned"
                description="Average Calories Burned on each workout today"
                value={3000}
                unit="kcal"
              />
            </FlexWrap>
            <FlexWrap>
              <CountsCard
                title="Calories Burned (for the whole time)"
                description="Total calories burned"
                value={50000}
                unit="kcal"
              />
              <CountsCard
                title="Workouts (for the whole time)"
                description="Total number of workouts"
                value={23}
                unit=""
              />
              <CountsCard
                title="Average Calories Burned (for the whole time)"
                description="Average Calories Burned on each workout"
                value={56000}
                unit="kcal"
              />
            </FlexWrap>
            <Section>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                Today's workouts
              </h3>
              <CardWrapper>
                {workoutsToday.map((workout) => (
                  <WorkoutCard key={workout._id} {...workout} />
                ))}
              </CardWrapper>
            </Section>
          </Wrapper>
        </Container>
      </section>
      <WorkOuts />
    </>
  );
};

export default Dashboard;
