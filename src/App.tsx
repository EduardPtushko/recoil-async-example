import { Suspense, useState } from 'react'
import { atom, selector, selectorFamily, useRecoilState, useRecoilValue } from 'recoil'
import styles from './App.module.css'

type UserType = {
	name: string
	phone: string
}

const userState = selectorFamily<UserType, number>({
	key: 'user',
	get:
		(userId) =>
		async ({ get }) => {
			const user: UserType = await fetch(
				`https://jsonplaceholder.typicode.com/users/${userId}`,
			).then((res) => res.json())
			return user
		},
})

function App() {
	const [userId, setUserId] = useState<number | undefined>(undefined)

	return (
		<div className={styles.container}>
			<h1>View Profile</h1>
			<h2>Choose a user:</h2>
			<div className={styles.selectWrapper}>
				<select
					className={styles.select}
					value={userId}
					onChange={(e) => {
						const value = e.target.value
						setUserId(value ? parseInt(value) : undefined)
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

			{userId !== undefined && (
				<Suspense fallback={<div>Loading...</div>}>
					<UserData userId={userId} />
				</Suspense>
			)}
		</div>
	)
}

export default App

const UserData = ({ userId }: { userId: number }) => {
	const user = useRecoilValue(userState(userId))

	return (
		<div>
			<h2>User Data:</h2>
			<p>
				<b>Name:</b> {user.name}
			</p>
			<p>
				<b>Phone:</b> {user.phone}
			</p>
		</div>
	)
}
