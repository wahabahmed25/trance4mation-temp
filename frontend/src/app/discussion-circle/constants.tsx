import { RoomSetting } from "@/features/discussion-circle/types/RoomSetting";
import { Poppins, Merriweather } from "next/font/google"

export const POPPINS_BOLD = Poppins({
    weight: "700"
})
export const MERRIWEATHER = Merriweather({
    weight: "400"
})

export const SETTINGS: RoomSetting[] = [
  {
    image: "/user-regular-full.svg",
    label: "Participants",
    field: "maxSize",
    type: "number",
    defaultValue: 5,
  },
  {
    image: "/alarm-clock-regular-full.svg",
    label: "Time Limit",
    field: "timeLimit",
    type: "number",
    defaultValue: 30,
    step: 5,
  },
  {
    image: "/rotate-left-regular-full.svg",
    label: "Rounds",
    field: "rounds",
    type: "number",
    defaultValue: 3,
  },
];

export const DEFAULT_SETTINGS = {
  description: "",
  maxSize: 5,
  name: "",
  rounds: 3,
  timeLimit: 30,
};