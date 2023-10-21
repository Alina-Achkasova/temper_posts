export default class HistoryItemModel {
  postId: number;
  oldIndex: number;
  newIndex: number;

  constructor() {
    this.postId = 0;
    this.oldIndex = 0;
    this.newIndex = 0;
  }
}
