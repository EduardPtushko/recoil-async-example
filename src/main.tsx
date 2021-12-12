import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { RecoilRoot } from 'recoil'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root Element should be provided')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
	// <React.StrictMode>
	<RecoilRoot>
		<App />
	</RecoilRoot>,
	// </React.StrictMode>,
)
