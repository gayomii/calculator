import { initStore } from './store.js';
import { initHistoryList } from './components/history-list.js';
import { initCurrentAsset } from './components/current-asset.js';
import { initAddItem } from './components/add-item.js';

init();

function init() {
  initStore();

  initCurrentAsset();
  initAddItem();
  initHistoryList();
}
