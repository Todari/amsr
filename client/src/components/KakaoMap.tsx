import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";


const KakaoMap = () => {
  // const apiKey = process.env.KAKAO_API_KEY;

  // const [loading, error] = useKakaoLoader({
  //   appkey: apiKey // 발급 받은 APPKEY

  // })

  return (
    <Map id="map"
      center={{
        // 지도의 중심좌표
        lat: 37.55808645471607,
        lng: 126.93474760233823,
      }}
      // style={{
      //   // 지도의 크기
      //   width: "100%",
      //   height: "350px",
      // }}
      level={3}
      className="aspect-square w-full h-full">
        <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 37.55808645471607,
          lng: 126.93474760233823,
        }}
      />
      <ZoomControl position={"RIGHT"}/>
      </Map>
  )
}

export default KakaoMap