document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'home') {
    initHomePage();
  }

  if (page === 'search') {
    initSearchPage();
  }

  if (page === 'matching') {
    initMatchingPage();
  }
});

function initHomePage() {
  const cards = document.querySelectorAll('[data-category-link]');
  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      const category = card.dataset.categoryLink;
      if (!category) return;
      const url = new URL('search.html', window.location.href);
      url.searchParams.set('category', category);
      window.location.href = url.toString();
    });
  });
}

function initSearchPage() {
  const request = loadRepairRequest();
  const categoryCards = document.querySelectorAll('[data-category-select]');
  const symptomContainer = document.getElementById('symptomOptions');
  const form = document.getElementById('repairSearchForm');
  const selectedCategoryInput = document.getElementById('selectedCategory');
  const selectedSymptomsInput = document.getElementById('selectedSymptoms');
  const categoryInSearch = new URLSearchParams(window.location.search).get('category');
  const miniCategory = document.getElementById('miniCategory');
  const miniSymptoms = document.getElementById('miniSymptoms');
  const miniArea = document.getElementById('miniArea');

  const categories = window.FIND2FIX_DATA.categories;
  let selectedCategory = request.category || categoryInSearch || '';
  let selectedSymptoms = Array.isArray(request.symptoms) ? request.symptoms.slice() : [];

  const syncSearchSummary = () => {
    if (miniCategory) miniCategory.textContent = selectedCategory ? getCategoryName(selectedCategory) : 'ยังไม่เลือก';
    if (miniSymptoms) miniSymptoms.textContent = selectedSymptoms.length ? selectedSymptoms.join(', ') : 'ยังไม่เลือก';
    if (miniArea) {
      const areaValue = document.getElementById('serviceArea')?.value.trim();
      miniArea.textContent = areaValue || 'ไม่ระบุ';
    }
  };

  const renderCategoryState = () => {
    categoryCards.forEach((card) => {
      const isSelected = card.dataset.categorySelect === selectedCategory;
      card.classList.toggle('selected', isSelected);
      card.setAttribute('aria-pressed', String(isSelected));
    });
    selectedCategoryInput.value = selectedCategory;
    syncSearchSummary();
  };

  const renderSymptoms = () => {
    const category = categories.find((item) => item.id === selectedCategory);
    if (!category) {
      symptomContainer.innerHTML = '<p class="section-sub">กรุณาเลือกประเภทสิ่งของก่อน</p>';
      selectedSymptomsInput.value = '';
      syncSearchSummary();
      return;
    }

    symptomContainer.innerHTML = category.symptoms
      .map((symptom) => {
        const selected = selectedSymptoms.includes(symptom);
        return `
          <button type="button" class="symptom-pill ${selected ? 'selected' : ''}" data-symptom="${symptom}" aria-pressed="${selected}">
            ${symptom}
          </button>
        `;
      })
      .join('');

    symptomContainer.querySelectorAll('[data-symptom]').forEach((button) => {
      button.addEventListener('click', () => {
        const symptom = button.dataset.symptom;
        if (selectedSymptoms.includes(symptom)) {
          selectedSymptoms = selectedSymptoms.filter((item) => item !== symptom);
        } else {
          selectedSymptoms = [...selectedSymptoms, symptom];
        }
        renderSymptoms();
        selectedSymptomsInput.value = selectedSymptoms.join(', ');
        syncSearchSummary();
      });
    });

    selectedSymptomsInput.value = selectedSymptoms.join(', ');
    syncSearchSummary();
  };

  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      selectedCategory = card.dataset.categorySelect;
      if (selectedCategory && !selectedSymptoms.length) {
        const categoryData = categories.find((item) => item.id === selectedCategory);
        selectedSymptoms = categoryData ? categoryData.symptoms.slice(0, 1) : [];
      }
      renderCategoryState();
      renderSymptoms();
    });
  });

  const serviceAreaInput = document.getElementById('serviceArea');
  const descriptionInput = document.getElementById('problemDescription');

  if (serviceAreaInput) {
    serviceAreaInput.addEventListener('input', syncSearchSummary);
  }

  if (request.category) {
    selectedCategory = request.category;
  }
  if (request.symptoms && request.symptoms.length) {
    selectedSymptoms = request.symptoms;
  }
  if (request.serviceArea) {
    serviceAreaInput.value = request.serviceArea;
  }
  if (request.description) {
    descriptionInput.value = request.description;
  }

  renderCategoryState();
  renderSymptoms();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validateSearchForm(selectedCategory, selectedSymptoms);
    displayValidationMessages(errors);

    if (Object.keys(errors).length > 0) return;

    const repairRequest = {
      category: selectedCategory,
      symptoms: selectedSymptoms,
      description: descriptionInput.value.trim(),
      serviceArea: serviceAreaInput.value.trim()
    };

    sessionStorage.setItem('find2fixRepairRequest', JSON.stringify(repairRequest));
    window.location.href = 'matching.html';
  });
}

function displayValidationMessages(errors) {
  const categoryError = document.getElementById('categoryError');
  const symptomError = document.getElementById('symptomError');

  if (categoryError) {
    categoryError.classList.toggle('visible', !!errors.category);
    categoryError.textContent = errors.category || '';
  }

  if (symptomError) {
    symptomError.classList.toggle('visible', !!errors.symptom);
    symptomError.textContent = errors.symptom || '';
  }
}

function validateSearchForm(category, symptoms) {
  const errors = {};
  if (!category) errors.category = 'กรุณาเลือกประเภทสิ่งของก่อนทำการค้นหา';
  if (!symptoms || symptoms.length === 0) errors.symptom = 'กรุณาเลือกอาการเสียอย่างน้อย 1 รายการ';
  return errors;
}

function loadRepairRequest() {
  const raw = sessionStorage.getItem('find2fixRepairRequest');
  if (!raw) return { category: '', symptoms: [], description: '', serviceArea: '' };

  try {
    const parsed = JSON.parse(raw);
    return {
      category: parsed.category || '',
      symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
      description: parsed.description || '',
      serviceArea: parsed.serviceArea || ''
    };
  } catch (error) {
    return { category: '', symptoms: [], description: '', serviceArea: '' };
  }
}

function initMatchingPage() {
  const summary = document.getElementById('matchingSummary');
  const resultContainer = document.getElementById('techResults');
  const request = loadRepairRequest();

  if (!request.category) {
    resultContainer.innerHTML = `
      <div class="empty-state">
        <h3>ยังไม่มีคำขอซ่อมสำหรับการค้นหา</h3>
        <p>กรุณาเริ่มค้นหาใหม่เพื่อเลือกประเภทสิ่งของและอาการเสีย</p>
        <div class="inline-actions">
          <a href="search.html" class="btn btn-primary">กลับไปเลือกสิ่งของ</a>
        </div>
      </div>
    `;
    return;
  }

  const summaryData = [
    { label: 'สิ่งของ', value: getCategoryName(request.category) },
    { label: 'อาการเสีย', value: request.symptoms.join(', ') || '—' },
    { label: 'รายละเอียด', value: request.description || 'ไม่มีรายละเอียดเพิ่มเติม' },
    { label: 'พื้นที่', value: request.serviceArea || 'ไม่ระบุตำแหน่ง' }
  ];

  summary.innerHTML = summaryData.map((item) => `
    <li><span>${item.label}</span><strong>${escapeHtml(item.value)}</strong></li>
  `).join('');

  const matches = rankTechnicians(request);

  if (!matches.length) {
    resultContainer.innerHTML = `
      <div class="empty-state">
        <h3>ไม่พบช่างที่ตรงกับรายการที่คุณเลือก</h3>
        <p>ลองเปลี่ยนประเภทสิ่งของหรืออาการเสียเพื่อค้นหาช่างที่เหมาะสมมากขึ้น</p>
        <div class="inline-actions">
          <a href="search.html" class="btn btn-primary">ปรับเปลี่ยนการค้นหา</a>
        </div>
      </div>
    `;
    return;
  }

  resultContainer.innerHTML = matches.map((match) => `
    <article class="tech-card">
      <div class="tech-photo">
        <div class="avatar">${getInitials(match.technician.name)}</div>
      </div>
      <div class="tech-info">
        <div class="tech-topline">
          <div>
            <div class="tech-name">${escapeHtml(match.technician.name)}</div>
            <div class="section-sub">${escapeHtml(match.technician.specialty)}</div>
          </div>
          <div class="rating-badge">★ ${match.technician.rating.toFixed(1)}</div>
        </div>
        <div class="tech-meta">
          <span class="meta-pill">${escapeHtml(match.technician.serviceAreas.join(', '))}</span>
          <span class="meta-pill">${escapeHtml(match.technician.priceRange)}</span>
        </div>
        <div class="match-reason">${match.reason}</div>
        <div class="tech-actions">
          <div class="price-tag">คาดการณ์ราคา ${escapeHtml(match.technician.priceRange)}</div>
          <a href="detail.html?technicianId=${match.technician.id}" class="btn btn-primary">ดูรายละเอียดและเลือกคิว</a>
        </div>
      </div>
    </article>
  `).join('');
}

function getCategoryName(categoryId) {
  const category = window.FIND2FIX_DATA.categories.find((item) => item.id === categoryId);
  return category ? category.name : '—';
}

function rankTechnicians(request) {
  const selectedSymptoms = request.symptoms || [];
  const serviceArea = request.serviceArea || '';
  const scored = [];

  // Rule-based matching:
  // 1) Only include technicians that support the selected category.
  // 2) Add score for each matching skill and symptom.
  // 3) Add a location advantage when the user supplies a service area.
  // 4) Stable sorting keeps results deterministic.
  window.FIND2FIX_DATA.technicians.forEach((technician) => {
    if (!technician.categories.includes(request.category)) return;

    let score = 0;
    const reasons = [];

    if (technician.categories.includes(request.category)) {
      score += 10;
      reasons.push(`เชี่ยวชาญการซ่อม${getCategoryName(request.category)}`);
    }

    const matchedSkills = selectedSymptoms.filter((symptom) => technician.skills.includes(symptom));
    if (matchedSkills.length) {
      score += matchedSkills.length * 8;
      reasons.push('มีทักษะตรงกับอาการที่คุณระบุ');
    }

    if (serviceArea) {
      const areaMatch = technician.serviceAreas.some((area) => area === serviceArea || area.includes(serviceArea));
      if (areaMatch) {
        score += 12;
        reasons.push('รับซ่อมในพื้นที่ที่คุณเลือก');
      } else {
        score += 3;
        reasons.push('มีความพร้อมรับซ่อมในพื้นที่ใกล้เคียง');
      }
    }

    if (technician.rating) {
      score += Math.round(technician.rating) * 2;
    }

    scored.push({
      technician,
      score,
      reason: reasons.length ? reasons.join(' • ') : 'มีประสบการณ์และความพร้อมในการรับซ่อมที่ตรงกับความต้องการ'
    });
  });

  return scored.sort((a, b) => b.score - a.score || a.technician.name.localeCompare(b.technician.name));
}

function getInitials(name) {
  return name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
