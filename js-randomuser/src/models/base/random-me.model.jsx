import { BaseFetch } from "../main-model";
export default class RandomMeModel extends BaseFetch {
  getRandomMe = (data) =>
    this.paramsFetch({
      url: "api/",
      method: "GET",
      body: JSON.stringify(data),
    });
}
