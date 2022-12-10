import React, { useEffect, useState } from 'react'
import Flight from '../Flight'
import styles from './AvailibleTickets.module.sass'
import cn from "classnames"
import FlightDashboard from '../Dashboard/FlightDashboard'
import Icon from '../Icon'
import SearchInput from '../SearchInput'
import { searchTickets } from '../../logic/apiCallsDashboard'

export const AvailibleTickets = () => {
	const [search, setSearch] = useState("");
	const [tickets, setTickets] = useState([]);
	useEffect(() => {searchForTickets()}, [])

	const searchForTickets = () => searchTickets(setTickets, search)

	return (
		<div>
			<div className={styles.head}>
				<div className={cn("h2", styles.title)}>Availible Tickets</div>
				<span>
					<img src={tickets.logo} alt="Logo" width={50} />
				</span>
				<SearchInput
					className={styles.field}
					name="city"
					type="text"
					label="Search tickets"
					placeholder="City, airport or flight"
					onInput={setSearch}
					value={search}
					searchFunc={searchForTickets}
				/>
			</div>
			<div className={styles.flights__wrapper}>
			
				{tickets.length!==0 && 
					tickets.items.map((x, index) => (
					<FlightDashboard className={styles.flight} item={x} key={index} />
				))}
			</div>
		</div>
	)
}
