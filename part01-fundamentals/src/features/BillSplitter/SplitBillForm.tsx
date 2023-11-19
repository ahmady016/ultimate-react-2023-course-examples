/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'

import { Friend, SplitBillInputs, WhoIsPaying } from './data'

const SplitBillFormContainer = styled.div`
    padding: 1.5rem;
    background-color: #ffdeb3;
    border-radius: 8px;
    font-size: 1rem;
    transition: 0.3s;
    &:hover {
        background-color: #ffd399;
    }
    h2 {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
    form {
        display: grid;
        grid-template-columns: 7fr 5fr;
        align-items: center;
        gap: 1.2rem;
        input, select {
            padding: 0.5rem;
            border: 1px solid #ffe8cc;;
            border-radius: 5px;
            font-size: 1rem;
            color: #495057;
            transition: 0.3s;
            &:focus {
                outline: none;
                border: 1px solid #ff922b;;
            }
        }
        button {
            padding: 1rem;
            &.reset {
                color: #ddd;
                background-color: #fc4d4d;
                &:hover {
                    background-color: #fa2424;
                }
            }
            &.submit {
                background-color: #fca84d;
                &:hover {
                    background-color: #fa9324;
                }
            }
        }
    }
`

type SplitBillFormProps = {
    selectedFriend: Friend
    doSplitBill: (inputs: SplitBillInputs) => void
}
const SplitBillForm: React.FC<SplitBillFormProps> = ({ selectedFriend, doSplitBill }) => {
    const [bill, setBill] = React.useState(0)
    const changeBill = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBill(Number(e.target.value))
	}, [])

    const [paidByUser, setPaidByUser] = React.useState(0)
    const changePaidByUser = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = Number(e.target.value)
        setPaidByUser(prevValue => inputValue > bill ? prevValue : inputValue)
	}, [bill])

    const paidByFriend = bill > 0 ? bill - paidByUser : 0

    const [whoIsPaying, setWhoIsPaying] = React.useState<WhoIsPaying>('user')
    const changeWhoIsPaying = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setWhoIsPaying(e.target.value as WhoIsPaying)
	}, [])

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!bill || !paidByUser) return;
        doSplitBill({ whoIsPaying, paidByUser, paidByFriend })
    }, [bill, whoIsPaying, paidByUser, paidByFriend])
    const handleReset = React.useCallback(() => {
        setBill(0)
        setPaidByUser(0)
        setWhoIsPaying('user')
    }, [])

    React.useEffect(() => void handleReset(), [selectedFriend])

    return (
        <SplitBillFormContainer>
            <h2>Split a bill with {selectedFriend.name}</h2>
            <form onSubmit={handleSubmit}>
                <label>💰 Bill value</label>
                <input type="number" value={bill} onChange={changeBill} />

                <label>🧍‍♀️ Your expense</label>
                <input type="number" value={paidByUser} onChange={changePaidByUser} />

                <label>👫 {selectedFriend.name}'s expense</label>
                <input type="number" value={paidByFriend} disabled />

                <label>🤑 Who is paying the bill</label>
                <select value={whoIsPaying} onChange={changeWhoIsPaying}>
                    <option value="user">You</option>
                    <option value="friend">{selectedFriend.name}</option>
                </select>

                <button className="reset" type="reset" onClick={handleReset}>Reset</button>
                <button className="submit" type="submit">Split Bill</button>
            </form>
        </SplitBillFormContainer>
    )
}

export default SplitBillForm
