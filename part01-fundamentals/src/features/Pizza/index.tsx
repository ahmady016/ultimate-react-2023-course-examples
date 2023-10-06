import React from 'react'

import { Pizza, closeHour, openHour, pizzaList } from './data'

import styled from 'styled-components'
const PizzaPageContainer = styled.div`
    font-family: 'Roboto Mono', sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    header.header {
        align-self: stretch;
        h1 {
            width: 100%;
            margin: 1rem 0;
            display: block;
            position: relative;
            color: #edc84b;
            text-transform: uppercase;
            text-align: center;
            font-size: 3rem;
            font-weight: 300;
            letter-spacing: 3px;
            &::before,
            &::after {
                display: block;
                content: '';
                height: 3px;
                width: 10rem;
                background-color: #edc84b;
                position: absolute;
                top: calc(50% - 1px);
            }
            &::before {
                left: 0;
            }
            &::after {
                right: 0;
            }
        }
    }

    section.menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        h2 {
            display: inline-block;
            padding: 0.5rem;
            border-top: 2px solid currentColor;
            border-bottom: 2px solid currentColor;
            font-size: 2.4rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 500;
        }
        & > p {
            font-size: 1.5rem;
            text-align: center;
            line-height: 1.6;
            width: 80%;
        }
    }

    ul.pizza-items {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
        li.pizza-item {
            display: flex;
            gap: 3.2rem;
            img {
                width: 12rem;
                aspect-ratio: 1;
                align-self: start;
            }
            div {
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                padding: 0.4rem 0;
            }
            h3 {
                font-size: 2rem;
                font-weight: 400;
            }
            p {
                font-size: 1.4rem;
                font-weight: 300;
                font-style: italic;
                margin-bottom: auto;
            }
            span {
                display: block;
                font-size: 1.6rem;
            }
            &.sold-out {
                color: #888;
                img {
                    filter: grayscale();
                    opacity: 0.8;
                }
            }
        }
    }

    footer.footer {
        font-size: 1.4rem;
        margin: 2rem 0;
        div.order {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2.4rem;
            button.btn {
                border: none;
                border-radius: 5px;
                font-size: 1.4rem;
                font-weight: 500;
                background-color: #edc84b;
                padding: 1rem 2rem;
                cursor: pointer;
                transition: all 0.2s;
                &:hover {
                    background-color: #e9bb24;
                }
            }
        }
    }
`

const PizzaHeader: React.FC = () => {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    )
}

const PizzaList: React.FC = () => {
    return (
        <section className="menu">
            <h2>Our Menu</h2>
            {pizzaList.length > 0
                ?   <ul className="pizza-items">
                        {pizzaList.map(pizza => <PizzaItem key={pizza.name} {...pizza} />)}
                    </ul>
                :   <p>Oops We are still working on our menu, please come back later!</p>
            }
        </section>
    )
}

const PizzaItem: React.FC<Pizza> = ({ name, photoName, ingredients, price, soldOut }) => {
	return (
        <li className={`pizza-item ${soldOut ? 'sold-out' : ''}`}>
            <img src={`src/features/pizza/images/${photoName}`} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <span>{price}</span>
            </div>
        </li>
    )
}

const PizzaFooter: React.FC = () => {
    const hour = new Date().getHours()
    const isOpen = hour >= openHour && hour <= closeHour
    return (
        <footer className="footer">
            {isOpen
                ?   <div className="order">
                        <p>we will be opened until {closeHour}:00 come visit us or Order online</p>
                        <button className="btn" type="button">Order Now</button>
                    </div>
                : <p>Oops We Are Closed Now, please come back between {openHour}:00 and {closeHour}:00 o'clock</p>
            }
        </footer>
    )
}

const PizzaPage: React.FC = () => {
	return (
        <PizzaPageContainer>
            <PizzaHeader />
            <PizzaList />
            <PizzaFooter />
        </PizzaPageContainer>
    )
}

export default PizzaPage
