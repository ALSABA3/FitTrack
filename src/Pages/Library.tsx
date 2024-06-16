import ExerciseCard from "@/components/ExerciseCard"
import exercises from "@/dummy-exercises.json";

function Library() {
    return (
      <section className="flex flex-col mt-20">
            <h2 className="text-5xl font-semibold mb-24 text-center">Library</h2>
            <div className="flex mx-20" style={{gap: "2rem", justifyContent: "center", display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))"}}>
                {
                  exercises.map((exercise) => (
                    <ExerciseCard {...exercise} />
                  ))
                }
            </div>
      </section>
    )
  }
  
  export default Library