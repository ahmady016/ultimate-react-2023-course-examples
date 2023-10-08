import React from 'react'
import styled from 'styled-components'

import { DeveloperSkill } from './data'

import ProfileSkill from './ProfileSkill'

const ProfileSkillsContainer = styled.ul`
	list-style: none;
	margin: 0 10px 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 8px;
`
type ProfileSkillsProps = {
	skills: DeveloperSkill[]
}
const ProfileSkills: React.FC<ProfileSkillsProps> = ({ skills }) => (
	<ProfileSkillsContainer>
		{skills.map((skill) => <ProfileSkill key={skill.name} {...skill} />)}
	</ProfileSkillsContainer>
)

export default ProfileSkills
