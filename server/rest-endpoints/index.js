import {addApiCollections} from "./collections";

export default function () {
    // Global API configuration
  const Api = new Restivus({
    apiPath: "api/",
    useDefaultAuth: true,
    prettyJson: true
  });
  addApiCollections(Api);
}
