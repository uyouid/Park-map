export interface ParsedCsvType {
  id: string;
  localGovernment: string;
  name: string;
  address: string;
  area: string;
  toilet: string;
  multipurposeToilet: string;
  drinkingWaterAndWashingHands: string;
  sandbox: string;
  complexPlayEquipment: string;
  healthAppliances: string;
  swing: string;
  slide: string;
  jungleGym: string;
  horizontalBar: string;
  seesaw: string;
  tarzanRope: string;
  vendingMachine: string;
  freeParking: string;
  paidParking: string;
  bicycleParking: string;
}

interface EquipmentType {
  name: string;
  presence: string;
}

export interface CoordinateType {
  latitude: number;
  longitude: number;
}

export interface ParkListType {
  id: string;
  name: string;
  equipments: EquipmentType[];
  coordinate: CoordinateType;
}
