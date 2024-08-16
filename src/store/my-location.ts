import { defineStore } from "pinia";
import { ref } from "vue";
import { CoordinateType } from "@/types";

export const useMyLocationStore = defineStore("myLocationStore", () => {
  const myLocation = ref<CoordinateType>({
    latitude: NaN,
    longitude: NaN
  });

  const getLatitude = () => myLocation.value.latitude;
  const getLongitude = () => myLocation.value.longitude;

  return {
    myLocation,
    getLatitude,
    getLongitude
  };
});
