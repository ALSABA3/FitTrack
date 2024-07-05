import ExerciseCard from "@/components/ui/ExerciseCard";
import exercises from "@/dummy-exercises.json";

const WorkOut = () => {
  return (
    <>
      <section className="flex flex-col mt-20">
        <h2 className="text-5xl font-semibold mb-24 text-center">Workouts</h2>
        <div
          className="flex mx-20"
          style={{
            gap: "2rem",
            justifyContent: "center",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
          }}
        >
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} {...exercise} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WorkOut;
