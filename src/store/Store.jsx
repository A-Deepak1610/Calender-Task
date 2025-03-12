import { create } from "zustand";
const DateDetails = create((set) => ({
    selectedDate:null,
    handleDate:(date)=>set({selectedDate:date}),
    mode:"light",
    handleMode:(mode)=>set({mode:mode}),
}));
export default DateDetails;