import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { HTMLInputTypeAttribute } from "react"

export type DiscussionCircleSetting = {
    image: string | StaticImport,
    label: string,
    type: HTMLInputTypeAttribute | undefined
}