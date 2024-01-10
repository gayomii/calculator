import { renderCurrentAsset } from '../components/current-asset.js';
import { store, removeHistory } from '../store.js';

const $sectionHistory = document.querySelector('.history');

export function initHistoryList() {
  renderHistoryList();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener('click', function (event) {
    const element = event.target;
    if (!element.className.includes('delete-button')) return;

    const { dateid, itemid } = element.dataset;

    const isSuccess = removeHistory(dateid, itemid);
    if (!isSuccess) {
      alert('소비내역 삭제에 실패했습니다.');
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

export function renderHistoryList() {
  $sectionHistory.innerHTML = store.dateList.map(({ date, id: dateId }) => {
    const detail = store.detailList[dateId];
    if (!detail?.length) return '';

    const [year, month, day] = date.split('.');
    return `<article class="history-per-day">
      <p class="history-date">${`${year.trim()}년 ${month.trim()}월 ${day.trim()}일`}</p>
      ${detail
        .sort((a, b) => b.id - a.id)
        .map(({ createAt, description, category, amount, fundsAtTheTime, id }) => {
          const createTime = new Date(createAt).toLocaleTimeString('ko-kr', { timeStyle: 'short', hourCycle: 'h24' });
          return `<section class="history-item">
        <section class="history-item-column">
          <div class="create-at">${createTime}</div>
          <div class="history-detail">
            <div class="history-detail-row history-detail-title">
              <p>${description}</p>
            </div>
            <div class="history-detail-row history-detail-subtitle">
              <p>${category}</p>
              <p>
                ${amount.toLocaleString()}
                <span>원</span>
              </p>
            </div>
          </div>
          <div class="delete-section">
            <button class="delete-button" data-dateid=${dateId} data-itemid=${id}>🗑</button>
          </div>
        </section>
        <section class="history-item-caption">
          <p>
            <span>남은 자산</span>
            <span>${fundsAtTheTime.toLocaleString()}</span>
            <span>원</span>
          </p>
        </section>
      </section>`;
        })
        .join('')}
      </article>`;
  });
}
