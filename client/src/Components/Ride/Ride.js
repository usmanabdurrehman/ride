import React from 'react'
import styles from './Ride.module.css'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import {Link} from 'react-router-dom'

export default function Ride({ride}) {
	return (
		<div className={styles.ride}>
			<div className={styles.address}>
				<div>From: {ride.from}</div>
				<div>To: {ride.to}</div>
			</div>
			<div className={styles.chevronWrapper}>
				<Link to={`/ride/${ride._id}`}><KeyboardArrowRightIcon/></Link>
			</div>
		</div>
	)
}