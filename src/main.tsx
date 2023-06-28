import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore.ts'

//서비스 워커 등록
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log("Service Worker registered with scope: ", registration.scope);
      },
      (err) => {
        console.log("Service Worker registration failed: ", err);
      }
    );
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* <BrowserRouter basename='/MLB_Management/'> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
