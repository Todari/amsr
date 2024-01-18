import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { toast } from "./ui/use-toast";
import STRING from "@/constants/String";


const KakaoMap = () => {

  const handleCopyLocation = async () => {
    try {
      await navigator.clipboard.writeText(STRING.mainLandingLocationCopy);
      toast({
        title: STRING.locationCopyComplete,
        description: STRING.locationCopyCompleteDescription,
      })
    } catch (error) {
      toast({
        title: STRING.locationCopyFail,
        description: STRING.locationCopyFailDescription,
      })
    }
  };

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
      className="aspect-square max-h-96 w-full">
        <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 37.55808645471607,
          lng: 126.93474760233823,
        }}
        clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        onClick={handleCopyLocation}
      />
      <ZoomControl position={"RIGHT"}/>
      </Map>
  )
}

export default KakaoMap

