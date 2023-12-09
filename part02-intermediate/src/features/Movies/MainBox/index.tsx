import React from 'react'
import styled from 'styled-components'

const MainBoxContainer = styled.main`
	margin: 1rem 0;
	display: flex;
	justify-content: center;
	gap: 2rem;
`
const MainBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <MainBoxContainer>{children}</MainBoxContainer>
}

export default MainBox
