import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/ui/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import UserService from "@/services/UserServices";
import { Context } from "@/main";
import { IWorkout } from "@/models/IWorkout";

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
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
`;
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid #40404020;
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px #007AFF15;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #007AFF;
`;
const Right = styled.div`
  flex: 1;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
`;
const SecTitle = styled.div`
  font-size: 22px;
  color: #404040;
  font-weight: 500;
`;

const Workouts = () => {
  const {store} = useContext(Context);
  const [workoutsToday, setWorkoutsToday] = useState<IWorkout[]>([]);
  const [date, setDate] = useState(`${new Date()}`);

  async function getWorkoutsToday(){
    try{
      const response = await UserService.getWorkoutsToday(store.user.username, new Date(date));
      setWorkoutsToday(response.data);
    }catch(e){
        console.log(e);
    }
  }

  useEffect(() => {
    getWorkoutsToday();
  }, [date]);

  return (
    <section className="flex flex-col mt-20">
      <h2 className="text-5xl font-semibold mb-7 text-center">Workouts</h2>
      <Container>
        <Wrapper>
          <Left>
            <Title>Select Date</Title>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(e: any) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
              />
            </LocalizationProvider>
          </Left>
          <Right>
            <Section>
              <SecTitle>Todays Workout</SecTitle>
                <CardWrapper>
                  {workoutsToday.map((workout) => (
                    <WorkoutCard key = {workout._id} {...workout} />
                  ))}
                </CardWrapper>
            </Section>
          </Right>
        </Wrapper>
      </Container>
    </section>
  );
};

export default Workouts;
