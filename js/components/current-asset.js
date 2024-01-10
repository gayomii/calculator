import { store, updateStorage } from '../store.js';
import { toHidden, toShow } from '../util.js';

const $currentAssetInput = document.querySelector('.current-asset-input');
const $currentAssetValue = document.querySelector('.current-asset-value');
const $currentAssetButton = document.querySelector('.current-asset-button');
const $addItemButton = document.querySelector('.add-item-button');

export function initCurrentAsset() {
  renderCurrentAsset();
  addCurrentAssetEventListener();
}

function addCurrentAssetEventListener() {
  $currentAssetValue.addEventListener('click', function (event) {
    if (!store.isFirstEdit) return;
    toHidden(event.target);
    toShow($currentAssetInput);
    toShow($currentAssetButton);

    $currentAssetInput.focus();
  });

  $currentAssetButton.addEventListener('click', function (event) {
    toHidden(event.target);
    toHidden($currentAssetInput);
    toShow($currentAssetValue);
    toShow($addItemButton);

    store.currentFunds = Number($currentAssetInput.value);
    renderCurrentAsset();

    store.isFirstEdit = false;

    updateStorage();
  });
}

export function renderCurrentAsset() {
  // TODO: 숫자에 콤마 작성
  // TODO: currentFunds가 없는 경우
  $currentAssetValue.textContent = store.currentFunds ?? "-";
  $currentAssetInput.value = store.currentFunds;
}
