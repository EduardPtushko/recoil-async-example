import { Suspense, useState } from 'react'
import {
	atom,
	atomFamily,
	selector,
	selectorFamily,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil'
import styles from './App.module.css'
import { getWeather } from './fakeApi'

type UserType = {
	name: string
	phone: string
	address: {
		city: string
		zipcode: string
	}
}

const userState = selectorFamily<UserType, number>({
	key: 'user',
	get: (userId) => async () => {
		const user: UserType = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userId}`,
		).then((res) => res.json())
		return user
	},
})

const weatherState = selectorFamily({
	key: 'weather',
	get:
		(userId: number) =>
		async ({ get }) => {
			get(weatherRequestRefreshId(userId))

			const user = get(userState(userId))
			const weather = await getWeather(user.address.zipcode)
			return weather
		},
})

const weatherRequestRefreshId = atomFamily({
	key: 'weatherRefreshId',
	default: 0,
})

const useRefetchWeather = (userId: number) => {
	const setRequestId = useSetRecoilState(weatherRequestRefreshId(userId))
	return () => setRequestId((id) => id + 1)
}

const WeatherData = ({ userId }: { userId: number }) => {
	const user = useRecoilValue(userState(userId))
	const weather = useRecoilValue(weatherState(userId))
	const refetch = useRefetchWeather(userId)

	return (
		<>
			<p>
				<b>
					Weather for {user.address.city}: {weather}ºC
				</b>
			</p>
			<p onClick={refetch}>(refresh weather)</p>
		</>
	)
}

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
			<Suspense fallback={<div>Loading weather...</div>}>
				<WeatherData userId={userId} />
			</Suspense>
		</div>
	)
}

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
