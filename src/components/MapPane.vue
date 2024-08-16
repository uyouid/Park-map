<script setup lang="ts">
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
  import { onMounted } from "vue";
  import { getCsv } from "@/utils/get-csv";
  import { parseCsv } from "@/utils/parse-csv";
  import { useParkListStore } from "@/store/park-list";
  import { useMyLocationStore } from "@/store/my-location";
  import { storeToRefs } from "pinia";

  const parkListStore = useParkListStore();
  const { parkList } = storeToRefs(parkListStore);
  const { getParkList } = parkListStore;
  const myLocationStore = useMyLocationStore();
  const { myLocation } = storeToRefs(myLocationStore);
  const { getLatitude, getLongitude } = myLocationStore;

  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          myLocation.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        },
        function (error) {
          console.error("Failed to get geolocation", error);
        }
      );
    } else {
      console.error("This browser is not supported for Geolocation");
    }
  };

  const getImageUrl = (fileName: string) => {
    return new URL(`../assets/${fileName}.png`, import.meta.url).href;
  };

  onMounted(async () => {
    getGeolocation();
    const parkListCsv = await getCsv();
    if (parkListCsv) {
      const parsedParkList = await parseCsv(parkListCsv);
      if (parsedParkList) {
        parkList.value = parsedParkList;
      }
    }
  });
</script>

<template>
  <LMap
    id="map"
    :zoom="13"
    :min-zoom="9"
    :max-bounds="[
      [35.67258748171541, 139.31604693978196],
      [35.30955393024495, 139.85734694273893]
    ]"
    :center="[35.47066780501096, 139.52276289378253]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    ></LTileLayer>
    <LMarker
      v-for="park in getParkList()"
      :key="park.id"
      :lat-lng="[park.coordinate.latitude, park.coordinate.longitude]"
    >
      <LPopup>
        <h1>{{ park.name }}</h1>
        <div id="parkInfo">
          <table border="1">
            <tbody>
              <tr v-for="(equipment, key) in park.equipments" :key="key">
                <td>{{ equipment.name }}</td>
                <td>{{ equipment.presence }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LPopup>
    </LMarker>
    <div v-if="Number.isNaN(getLatitude()) !== true && Number.isNaN(getLongitude()) !== true">
      <LMarker :lat-lng="[getLatitude(), getLongitude()]">
        <LIcon :icon-url="getImageUrl('marker-icon')" :icon-anchor="[12, 41]" class-name="icon-red">
        </LIcon>
        <LPopup>
          <h1>現在地</h1>
        </LPopup>
      </LMarker>
    </div>
  </LMap>
</template>
