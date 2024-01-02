import React from 'react'

import { Weather, dateToWeekDay, getWeatherIcon } from './data'

const DayItem: React.FC<Weather> = ({ date, code, minTemperature, maxTemperature }) => {
	return (
		<li>
			<span>{getWeatherIcon(code)}</span>
			<p>{dateToWeekDay(date)}</p>
			<p>
				{Math.floor(minTemperature)}&deg; &mdash; <strong>{Math.ceil(maxTemperature)}&deg;</strong>
			</p>
		</li>
	)
}

export default DayItem
