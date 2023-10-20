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

let cachedPackingList = initialPackingList.reduce((cachedList, item) => {
    const { id, ...itemWithoutId } = item
    cachedList[id] = itemWithoutId
    return cachedList
}, {} as Record<string, Omit<PackingItem, 'id'>>)

export const toPackingListArray = () => {
    return Object
        .entries(cachedPackingList)
        .map(([id, item]) => ({ id, ...item })) as PackingItem[]
}

export const addToCachedPackingList = (newItem: PackingItem) => {
    const { id, ...itemWithoutId } = newItem
    cachedPackingList[id] = itemWithoutId
}
export const toggleCachedPackingListStatus = (id: string) => {
    cachedPackingList[id].packed = !cachedPackingList[id].packed
}
export const removeFromCachedPackingList = (id: string) => {
    delete cachedPackingList[id]
}
export const clearCachedPackingList = () => {
    cachedPackingList = {}
}
