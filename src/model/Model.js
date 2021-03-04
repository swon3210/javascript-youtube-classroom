export default class Model {
  #lastQuery;
  #nextPageToken;

  set LastQuery(value) {
    if (typeof value !== 'string' || value.length === 0) {
      return;
    }
    this.#lastQuery = value;
  }

  set NextPageToken(value) {
    if (typeof value !== 'string' || value.length === 0) {
      return;
    }
    this.#nextPageToken = value;
  }
}
