import { defineStore } from "pinia";
import { ref } from "vue";
import { ParkListType } from "@/types";

export const useParkListStore = defineStore("parkListStore", () => {
  const parkList = ref<ParkListType[]>([]);

  const getParkList = () => parkList.value;

  return {
    parkList,
    getParkList
  };
});
