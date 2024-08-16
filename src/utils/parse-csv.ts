import { parse } from "csv-parse/browser/esm/sync";
import { ParsedCsvType, ParkListType } from "@/types";
import { normalize } from "@geolonia/normalize-japanese-addresses";

const options = {
  bom: true,
  columns: true,
  skip_empty_lines: true
};

export const parseCsv = async (csv: string): Promise<ParkListType[] | null> => {
  let parkList: ParkListType[] = [];

  try {
    const parsedCsv: ParsedCsvType[] = parse(csv, options);
    for (const park of parsedCsv) {
      const normalizedAddress = await normalize(park.address);
      if (normalizedAddress.lat && normalizedAddress.lng) {
        parkList.push({
          id: park.id,
          name: park.name,
          equipments: [
            {
              name: "トイレ",
              presence: park.toilet === "1" ? "あり" : park.toilet === "0" ? "なし" : "不明"
            },
            {
              name: "多目的トイレ",
              presence:
                park.multipurposeToilet === "1"
                  ? "あり"
                  : park.multipurposeToilet === "0"
                    ? "なし"
                    : "不明"
            },
            {
              name: "水飲み場",
              presence:
                park.drinkingWaterAndWashingHands === "1"
                  ? "あり"
                  : park.drinkingWaterAndWashingHands === "0"
                    ? "なし"
                    : "不明"
            },
            {
              name: "砂場",
              presence: park.sandbox === "1" ? "あり" : park.sandbox === "0" ? "なし" : "不明"
            },
            {
              name: "ブランコ",
              presence: park.swing === "1" ? "あり" : park.swing === "0" ? "なし" : "不明"
            },
            {
              name: "すべり台",
              presence: park.slide === "1" ? "あり" : park.slide === "0" ? "なし" : "不明"
            },
            {
              name: "シーソー",
              presence: park.seesaw === "1" ? "あり" : park.seesaw === "0" ? "なし" : "不明"
            },
            {
              name: "ターザンロープ",
              presence: park.tarzanRope === "1" ? "あり" : park.tarzanRope === "0" ? "なし" : "不明"
            },
            {
              name: "無料駐車場",
              presence:
                park.freeParking === "1" ? "あり" : park.freeParking === "0" ? "なし" : "不明"
            },
            {
              name: "有料駐車場",
              presence:
                park.paidParking === "1" ? "あり" : park.paidParking === "0" ? "なし" : "不明"
            }
          ],
          coordinate: {
            latitude: normalizedAddress.lat,
            longitude: normalizedAddress.lng
          }
        });
      } else {
        throw new Error("Couldn't get coordinates");
      }
    }
    return parkList;
  } catch (err) {
    console.error(err);
    return null;
  }
};
