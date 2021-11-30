import { useState } from 'react'
import styles from './App.module.css'

function App() {
	const [choice, setChoice] = useState<number | undefined>(undefined)

	return (
		<div className={styles.container}>
			<h1>View Profile</h1>
			<h2>Choose a user:</h2>
			<div className={styles.selectWrapper}>
				<select
					className={styles.select}
					value={choice}
					onChange={(e) => {
						const value = e.target.value
						setChoice(value ? parseInt(value) : undefined)
					}}
				>
					<option>Choose a user</option>
					<option value="1">User 1</option>
					<option value="2">User 2</option>
					<option value="3">User 3</option>
					<option value="4">User 4</option>
				</select>
				<div className={styles.selectIconWrapper}>
					<svg
						viewBox="0 0 24 24"
						role="presentation"
						className={styles.selectIcon}
						focusable="false"
						aria-hidden="true"
					>
						<path
							fill="currentColor"
							d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
						></path>
					</svg>
				</div>
			</div>
		</div>
	)
}

export default App
