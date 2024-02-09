import React from 'react'
import { PiSpeakerHighFill, PiSpeakerSlashFill } from 'react-icons/pi'

type ToggleSoundProps = {
	allowSound: boolean
	toggleSound: () => void
}
const ToggleSound: React.FC<ToggleSoundProps> = ({ allowSound, toggleSound }) => (
	<button onClick={toggleSound}>
		{allowSound ? <PiSpeakerHighFill /> : <PiSpeakerSlashFill />}
	</button>
)

export default ToggleSound
