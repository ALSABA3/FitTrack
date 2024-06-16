interface Exercise {
  id: string;
  image: string;
  title: string;
  description: string;
  calorieBurning: number;
}

function ExerciseCard({id, image, title, description, calorieBurning}: Exercise) {
  let calorieScore = [];
  const calorieScoreLimit = 5;
  for (let i:number = 0; i < calorieScoreLimit; ++i) {
    i < calorieBurning ? calorieScore.push("flex-1 bg-orange-400/80"): calorieScore.push("flex-1 bg-gray-500/20");
  }
  return ( 
    <div key={id} >
      <div style={{position: "relative"}}>
        <div className="border-[0.5px] border-slate-700/90 rounded-xl p-2 transition ease-in-out block pb-4 transition ease-in-out duration-200  hover:outline outline-2 outline-blue-500 relative overflow-hidden group glass-effect-sm" style={{background: "linear-gradient(180deg,rgba(226,232,255,0),rgba(226,232,255,.066))", zIndex: "1", position:"relative", height: "400px"}}>
        <a href="/Library">
          <img src={image} width="640" height="360" className="w-full object-cover overflow-hidden rounded-lg aspect-[16/9]" style={{color: "transparent"}}/>
          <div className="mt-3 p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.6rem] font-medium text-gray-400 mb-1">Calorie burning</div>
                <div className="flex w-40 h-1 rounded-lg overflow-hidden gap-[0.15rem]">
                  {
                    calorieScore.map((el) => (
                      <div className={el}/>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="font-semibold text-black-300/80 mt-3">{title}</div>
            <div className="text-gray-400/80 text-sm mt-1 font-normal">
              <div className="LinesEllipsis LinesEllipsis--clamped ">
                {description}
              </div>
            </div>
          </div>
        </a>
        </div>
      </div>
    </div>
  )
}

export default ExerciseCard