import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { HTMLInputTypeAttribute } from "react"

export type RoomSetting = {
    image: string | StaticImport,
    label: string,
    field: string,
    type: HTMLInputTypeAttribute | undefined,
    defaultValue?: string | number | readonly string[] | undefined
}