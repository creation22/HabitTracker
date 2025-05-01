import  {createContext , useContext} from "react"

export const HabbitContext = createContext({
    habits : [
        {
            id : 1 , 
            habbit : "habbit message",
            completed : false,
            streak : 0,
            createdAt : new Date().toLocaleDateString(),
            updatedAt : new Date().toLocaleDateString(),
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