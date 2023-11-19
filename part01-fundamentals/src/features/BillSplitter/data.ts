import { nanoid } from "nanoid"

export type Friend = {
	id: string
	name: string
	imageUrl: string
	balance: number
}
export type WhoIsPaying = 'user' | 'friend'
export type SplitBillInputs = {
	whoIsPaying: WhoIsPaying
	paidByFriend: number
	paidByUser: number
}

export const getFullImageUrl = (id: string) => `https://i.pravatar.cc/64?u=${id}`

const ids: string[] = [ nanoid(10), nanoid(10), nanoid(10), nanoid(10), nanoid(10)]
const initialFriendsArray: Friend[] = [
	{
		id: ids[0],
		name: 'Ashraf Zaki',
		imageUrl: getFullImageUrl(ids[0]),
		balance: -10,
	},
	{
		id: ids[1],
		name: 'Sarah Ali',
		imageUrl: getFullImageUrl(ids[1]),
		balance: 20,
	},
	{
		id: ids[2],
		name: 'Omar Salah',
		imageUrl: getFullImageUrl(ids[2]),
		balance: 0,
	},
	{
		id: ids[3],
		name: 'Sayed Gaber',
		imageUrl: getFullImageUrl(ids[3]),
		balance: 40,
	},
	{
		id: ids[4],
		name: 'Eman Nasr',
		imageUrl: getFullImageUrl(ids[4]),
		balance: -60,
	},
]

export const initialFriendsMap = initialFriendsArray.reduce((friendsMap, item) => {
    const { id, ...itemWithoutId } = item
    friendsMap[id] = itemWithoutId
    return friendsMap
}, {} as Record<string, Omit<Friend, 'id'>>)
export const toFriendsArray = (friendsMap: Record<string, Omit<Friend, 'id'>>) => {
    return Object
        .entries(friendsMap)
        .map(([id, item]) => ({ id, ...item })) as Friend[]
}
export const getSelectedFriend =
	(friendsMap: Record<string, Omit<Friend, 'id'>>) =>
		(id: string) =>
			({ id, ...friendsMap[id] })
