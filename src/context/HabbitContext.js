import  {createContext , useContext} from "react"

export const HabbitContext = createContext({
    habits : [
        {
            id: 1,
            habit: "Read Book",
            createdAt: "2025-05-01",
            streakDates: [],
            streak: 0,
            longestStreak: 0,
          }
        
    ],
    addHabbit : () => {} ,
    deleteHabbit : () => {} ,
    editHabbit : () => {} ,
    editStreak : () => {} 
})

export const useHabbit = () => {
    return useContext(HabbitContext)
}
export const HabbitProvider = HabbitContext.Provider