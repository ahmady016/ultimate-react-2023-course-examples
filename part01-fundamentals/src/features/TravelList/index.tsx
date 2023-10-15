/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import { PackingItem, SortPackingItemsBy, initialPackingList } from './data'

import PackingLogo from './PackingLogo'
import PackingForm from './PackingForm'
import PacKingList from './PackingList'
import PackingActions from './PackingActions'
import PackingStats from './PackingStats'

const TravelListPageContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    color: #5a3e2b;
    font-family: "Quicksand", sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
`
const TravelListPage: React.FC = () => {
    const [packingsList, setPackingsList] = React.useState(initialPackingList)
    const createPackingItem = React.useCallback((newItem: PackingItem) => {
        setPackingsList(list => [...list, newItem])
    }, [])
    const removePackingItem = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(window.confirm("Are you sure you want to delete this item?")) {
            const id = e.currentTarget.id
            setPackingsList(list => list.filter(item => item.id !== id))
        }
    }, [])
    const togglePackedStatus = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.currentTarget.id
        setPackingsList(list => list.map(item =>
            item.id === id
                ? { ...item, packed: !item.packed }
                : item
        ))
    }, [])
    const sortPackingList = React.useCallback((sortBy: SortPackingItemsBy) => {
        switch (sortBy) {
            case 'input':
                setPackingsList(list => [...list].sort((a, b) => a.id.localeCompare(b.id)))
                break;
            case 'packed':
                setPackingsList(list => [...list].sort((a, b) => (a.packed === b.packed) ? 0 : a.packed ? -1 : 1))
                break;
            case 'title':
                setPackingsList(list => [...list].sort((a, b) => a.title.localeCompare(b.title)))
                break;
            case 'quantity':
                setPackingsList(list => [...list].sort((a, b) => a.quantity - b.quantity))
                break;
            default:
                break;
        }
    }, [])
    const clearPackingList = React.useCallback(() => {
        if(window.confirm("Are you sure you want to delete all items?"))
            setPackingsList([])
    }, [])

	return (
        <TravelListPageContainer>
            <PackingLogo />
            <PackingForm createPackingItem={createPackingItem} />
            <PacKingList
                list={packingsList}
                togglePackedStatus={togglePackedStatus}
                removePackingItem={removePackingItem}
            />
            <PackingActions
                listLength={packingsList.length}
                sortPackingList={sortPackingList}
                clearPackingList={clearPackingList}
            />
            <PackingStats items={packingsList} />
        </TravelListPageContainer>
    )
}

export default TravelListPage
