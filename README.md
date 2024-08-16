# Park-map

This is park map app. This app gets the csv described park list and information via http api and shows them on the map. It is created for the following open data.

[Kanagawa Open data catalog site](https://catalog.opendata.pref.kanagawa.jp/dataset/d1dd79afd3bcfe4ae56b139f5f7f7bb3/resource/831521db-d2ea-4f49-9642-b7738bd15b6c?inner_span=True)

## Setup

- Download the csv from above link
- Setup csv header according to [type definition](https://github.com/uyouid/Park-map/blob/main/src/types/index.ts)
- Upload the csv to the cloud (e.g., AWS) so that this app could get it via http request
- Setup env file
  - Copy `.env`
  - Paste it and rename
    - Rename `.env.development` when it will be running on the local
  - Input value
- Clean install
  ```bash
  npm ci
  ```

## Command

- Run the app on the local
  ```bash
  npm run dev
  ```

- Build
  ```bash
  npm run build
  ```

- Run linter and formatter
  ```bash
  npm run fix
  ```

## License

Licensed under the [MIT License](https://github.com/uyouid/Park-map/blob/main/LICENSE).
