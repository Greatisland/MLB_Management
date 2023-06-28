import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

async function requestPermission() {
  console.log("권한 요청 중...")

  const permission = await Notification.requestPermission()
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨")
    return
  }

  console.log("알림 권한이 허용됨")

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_VAPID_KEY,
  });

  if (token) console.log("token: ", token)
  else console.log("Can not get Token")

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload)
    // ...
  })
}

requestPermission()