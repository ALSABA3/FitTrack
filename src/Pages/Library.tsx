import ExerciseCard from "@/components/ExerciseCard"

function Library() {
    return (
      <section className="flex flex-col mt-20">
            <h2 className="text-5xl font-semibold mb-24 text-center">Library</h2>
            <div className="flex mx-20" style={{columnGap: "100px", justifyContent: "center"}}>
                <ExerciseCard/>
                <ExerciseCard/>
                <ExerciseCard/>
            </div>
      </section>
    )
  }
  
  export default Library