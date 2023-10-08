import React from 'react'
import styled from 'styled-components'

import { DeveloperSkill } from './data'

const ProfileSkillContainer = styled.li<{ $color: string }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 12px;
    border-radius: 5px;
    background-color: ${({ $color }) => $color};
    font-weight: 500;
`
const ProfileSkill: React.FC<DeveloperSkill> = ({ name, level, color }) => (
    <ProfileSkillContainer $color={color}>
        <span>{name}</span>
        <span>
            {level === "BEGINNER" && "👶"}
            {level === "INTERMEDIATE" && "👍"}
            {level === "ADVANCED" && "💪"}
        </span>
    </ProfileSkillContainer>
)

export default ProfileSkill
