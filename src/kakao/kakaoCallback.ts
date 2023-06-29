import { useEffect } from "react";
import axios from "axios"

const KakaoCallback = () => {
    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = `6ac3c9e09d2ab4b2a56f587cd4d31099`;
        const REDIRECT_URI = `https://hyeonjin-dev-upgraded-waffle-55vg9x9q9r34rx4-5174.preview.app.github.dev/oauth`;

        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
        .then((res: any) => {
            console.log(res);
            const { access_token } = res.data;
            axios.post(
                `https://kapi.kakao.com/v2/user/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                }
            )
            .then((res: any) => {
                console.log('2번쨰', res);
            })
        })
        .catch((Error: any) => {
            console.log(Error)
        })
    }, [])
    
    return(
        <>
        </>
    )
}
export default KakaoCallback;