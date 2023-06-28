import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore.ts'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase/firebaseConfig.ts'

initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* <BrowserRouter basename='/MLB_Management/'> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
