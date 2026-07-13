// 크리스마스 선물 추천 — 연령·성별 선택 → 조합 페이지 이동
let selAge = 0, selG = '';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initSidebar === 'function') initSidebar({ relatedTools: [] });
  const form = document.getElementById('pick-form');
  if (form) {
    document.querySelectorAll('#age-chips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        selAge = Number(chip.dataset.age);
        document.querySelectorAll('#age-chips .chip').forEach(c => c.classList.toggle('active', c === chip));
      });
    });
    document.querySelectorAll('#gender-chips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        selG = chip.dataset.g;
        document.querySelectorAll('#gender-chips .chip').forEach(c => c.classList.toggle('active', c === chip));
      });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const r = document.getElementById('pick-result');
      if (!selAge || !selG) {
        r.innerHTML = '<h3>연령대와 성별을 모두 선택해 주세요</h3>';
        r.hidden = false;
        return;
      }
      location.href = `/${selAge}-${selG}/`;
    });
  }
  const share = document.getElementById('btn-share');
  if (share) share.addEventListener('click', handleShare);
});

async function handleShare() {
  const data = {
    title: document.title,
    text: '연령·성별별 크리스마스 선물 추천 리스트 — 실패 없는 선물 고르기',
    url: location.origin + location.pathname,
  };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(data.url); showToast('링크가 복사되었습니다.'); }
  } catch (e) { if (e.name !== 'AbortError') showToast('주소창의 링크를 복사해 주세요.'); }
}

function showToast(msg) {
  const old = document.querySelector('.share-toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'share-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 250); }, 2200);
}
