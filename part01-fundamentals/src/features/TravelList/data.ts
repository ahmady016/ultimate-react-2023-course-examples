import { nanoid } from "nanoid"

export type SortPackingItemsBy = 'input' | 'packed' | 'title' | 'quantity'

export type PackingItem = {
    id: string
    title: string
    quantity: number
    packed: boolean
}

export const initialPackingList: PackingItem[] = [
    {
        id: nanoid(10),
        title: 'First Item',
        quantity: 2,
        packed: false,
    },
    {
        id: nanoid(10),
        title: 'Second Item',
        quantity: 4,
        packed: false,
    },
    {
        id: nanoid(10),
        title: 'Third Item',
        quantity: 1,
        packed: false,
    },
    {
        id: nanoid(10),
        title: 'Fourth Item',
        quantity: 5,
        packed: false,
    },
    {
        id: nanoid(10),
        title: 'Fifth Item',
        quantity: 3,
        packed: false,
    },
]
