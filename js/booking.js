document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'detail') {
    initBookingPage();
  }
});

function initBookingPage() {
  const technicianId = new URLSearchParams(window.location.search).get('technicianId');
  const technician = window.FIND2FIX_DATA.technicians.find((item) => item.id === technicianId);
  const details = document.getElementById('detailContent');

  if (!technician) {
    details.innerHTML = `
      <div class="empty-state">
        <h3>ไม่พบข้อมูลช่างซ่อมที่เลือก</h3>
        <p>ลิงก์นี้อาจเสียหายหรือข้อมูลช่างที่เลือกไม่ถูกต้อง กรุณากลับไปยังหน้ารายการช่างที่ตรงกัน</p>
        <div class="inline-actions">
          <a href="matching.html" class="btn btn-primary">กลับไปหน้าคัดกรอง</a>
        </div>
      </div>
    `;
    return;
  }

  const repairRequest = loadRepairRequest();
  const bookingState = {
    technicianId: technician.id,
    selectedDate: '',
    selectedTime: '',
    stage: 'profile'
  };

  const profileSection = document.getElementById('profileStage');
  const scheduleSection = document.getElementById('scheduleStage');
  const reviewSection = document.getElementById('reviewStage');
  const confirmationSection = document.getElementById('confirmationStage');

  const currentDateInfo = document.getElementById('currentTechnicianName');
  const currentTechPrice = document.getElementById('currentPrice');
  const currentTechRating = document.getElementById('currentRating');
  const detailSummary = document.getElementById('detailSummary');
  const summaryItem = document.getElementById('summaryItem');
  const summarySymptoms = document.getElementById('summarySymptoms');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const summaryCustomer = document.getElementById('summaryCustomer');
  const summaryNote = document.getElementById('summaryNote');
  const demoBookingSummary = document.getElementById('demoBookingSummary');

  const form = document.getElementById('bookingForm');
  const customerName = document.getElementById('customerName');
  const contactNumber = document.getElementById('contactNumber');
  const repairNote = document.getElementById('repairNote');

  currentDateInfo.textContent = technician.name;
  currentTechPrice.textContent = technician.priceRange;
  currentTechRating.textContent = technician.rating ? `★ ${technician.rating.toFixed(1)}` : 'ยังไม่มีคะแนน';

  const renderProfile = () => {
    const info = document.getElementById('technicianInfo');
    info.innerHTML = `
      <div class="profile-grid">
        <div class="avatar-large">${getInitials(technician.name)}</div>
        <div>
          <h2>${escapeHtml(technician.name)}</h2>
          <p class="section-sub">${escapeHtml(technician.specialty)}</p>
          <ul class="detail-list">
            <li><strong>ประสบการณ์:</strong> ${escapeHtml(technician.biography)}</li>
            <li><strong>พื้นที่ให้บริการ:</strong> ${escapeHtml(technician.serviceAreas.join(', '))}</li>
            <li><strong>ช่วงราคาโดยประมาณ:</strong> ${escapeHtml(technician.priceRange)}</li>
            <li><strong>คะแนนจำลอง:</strong> ${technician.rating ? `★ ${technician.rating.toFixed(1)}` : 'ยังไม่มีข้อมูล'}</li>
          </ul>
        </div>
      </div>
    `;

    const skills = document.getElementById('detailSkills');
    skills.innerHTML = technician.skills.map((skill) => `<span class="meta-pill">${escapeHtml(skill)}</span>`).join('');

    const categories = document.getElementById('detailCategories');
    categories.innerHTML = technician.categories.map((categoryId) => `<span class="meta-pill">${escapeHtml(getCategoryName(categoryId))}</span>`).join('');

    const gallery = document.getElementById('workSamples');
    gallery.innerHTML = technician.workSamples.map((sample) => `<div class="gallery-item">${escapeHtml(sample)}</div>`).join('');
  };

  const renderSchedule = () => {
    const scheduleList = document.getElementById('scheduleList');
    let availableSlotsCount = 0;

    scheduleList.innerHTML = technician.availability.map((day) => {
      const slots = day.slots.map((slot) => {
        const isSelected = bookingState.selectedDate === day.date && bookingState.selectedTime === slot.time;
        const isDisabled = !slot.available;
        if (slot.available) availableSlotsCount += 1;
        return `<button
          type="button"
          class="slot-button ${isSelected ? 'selected' : ''}"
          data-date="${day.date}"
          data-time="${slot.time}"
          ${isDisabled ? 'disabled' : ''}
          aria-pressed="${isSelected ? 'true' : 'false'}"
        >${slot.time}</button>`;
      }).join('');

      return `
        <div class="form-group">
          <h4>${formatThaiDate(day.date)}</h4>
          <div class="slot-grid">${slots}</div>
        </div>
      `;
    }).join('');

    const emptyState = document.getElementById('scheduleEmpty');
    emptyState.style.display = availableSlotsCount === 0 ? 'block' : 'none';

    scheduleList.querySelectorAll('.slot-button').forEach((button) => {
      button.addEventListener('click', () => {
        bookingState.selectedDate = button.dataset.date;
        bookingState.selectedTime = button.dataset.time;
        renderSchedule();
        updateBookingSummary();
      });
    });
  };

  const updateBookingSummary = () => {
    const itemName = getCategoryName(repairRequest.category || 'appliance');
    summaryItem.textContent = itemName;
    summarySymptoms.textContent = (repairRequest.symptoms || []).join(', ') || '—';
    summaryDate.textContent = bookingState.selectedDate ? formatThaiDate(bookingState.selectedDate) : 'ยังไม่ได้เลือกวันที่';
    summaryTime.textContent = bookingState.selectedTime || 'ยังไม่ได้เลือกเวลา';

    detailSummary.querySelectorAll('li').forEach((li) => {
      if (li.dataset.summaryField === 'date') {
        li.innerHTML = `<strong>วันที่:</strong> ${summaryDate.textContent}`;
      }
      if (li.dataset.summaryField === 'time') {
        li.innerHTML = `<strong>เวลา:</strong> ${summaryTime.textContent}`;
      }
    });
  };

  const showStage = (stageName) => {
    bookingState.stage = stageName;
    const sections = [profileSection, scheduleSection, reviewSection, confirmationSection];
    sections.forEach((section) => {
      section.classList.toggle('active', section.dataset.stage === stageName);
    });
  };

  document.getElementById('goToSchedule').addEventListener('click', () => showStage('schedule'));
  document.getElementById('backToProfile').addEventListener('click', () => showStage('profile'));
  document.getElementById('goToReview').addEventListener('click', () => {
    if (!bookingState.selectedDate || !bookingState.selectedTime) {
      document.getElementById('slotError').classList.add('visible');
      return;
    }
    document.getElementById('slotError').classList.remove('visible');
    renderReview();
    showStage('review');
  });

  document.getElementById('backToSchedule').addEventListener('click', () => showStage('schedule'));

  const renderReview = () => {
    const customerData = {
      name: customerName.value.trim(),
      number: contactNumber.value.trim(),
      note: repairNote.value.trim()
    };

    if (summaryCustomer) {
      summaryCustomer.textContent = `${customerData.name || '—'} / ${customerData.number || '—'}`;
    }
    if (summaryNote) {
      summaryNote.textContent = customerData.note || 'ไม่มีบันทึกเพิ่มเติม';
    }
    document.getElementById('reviewTechnician').textContent = technician.name;
    document.getElementById('reviewItem').textContent = getCategoryName(repairRequest.category || 'appliance');
    document.getElementById('reviewSymptoms').textContent = (repairRequest.symptoms || []).join(', ') || '—';
    document.getElementById('reviewDate').textContent = formatThaiDate(bookingState.selectedDate);
    document.getElementById('reviewTime').textContent = bookingState.selectedTime;
    document.getElementById('reviewPrice').textContent = technician.priceRange;
    document.getElementById('reviewCustomer').textContent = customerData.name || '—';
    document.getElementById('reviewContact').textContent = customerData.number || '—';
    document.getElementById('reviewNote').textContent = customerData.note || '—';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameValue = customerName.value.trim();
    const contactValue = contactNumber.value.trim();
    const errors = {};

    if (!nameValue) errors.name = 'กรุณากรอกชื่อผู้จอง';
    if (!contactValue) errors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    if (!bookingState.selectedDate || !bookingState.selectedTime) errors.slot = 'กรุณาเลือกวันและเวลานัดหมาย';

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const slotError = document.getElementById('slotError');

    nameError.textContent = errors.name || '';
    nameError.classList.toggle('visible', !!errors.name);
    phoneError.textContent = errors.phone || '';
    phoneError.classList.toggle('visible', !!errors.phone);
    slotError.textContent = errors.slot || '';
    slotError.classList.toggle('visible', !!errors.slot);

    if (Object.keys(errors).length > 0) return;

    const slotIsValid = technician.availability.some((day) =>
      day.date === bookingState.selectedDate &&
      day.slots.some((slot) => slot.time === bookingState.selectedTime && slot.available)
    );

    if (!slotIsValid) {
      slotError.textContent = 'เวลาเลือกไม่พร้อมใช้งานในข้อมูลจำลอง กรุณาเลือกคิวใหม่';
      slotError.classList.add('visible');
      return;
    }

    const ref = `FX-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const booking = {
      reference: ref,
      technicianId: technician.id,
      customerName: nameValue,
      contactNumber: contactValue,
      note: repairNote.value.trim(),
      item: getCategoryName(repairRequest.category || 'appliance'),
      symptoms: repairRequest.symptoms || [],
      date: bookingState.selectedDate,
      time: bookingState.selectedTime,
      isDemo: true
    };

    sessionStorage.setItem('find2fixDemoBooking', JSON.stringify(booking));

    document.getElementById('confirmationReference').textContent = ref;
    document.getElementById('confirmationTechnician').textContent = technician.name;
    document.getElementById('confirmationDate').textContent = formatThaiDate(bookingState.selectedDate);
    document.getElementById('confirmationTime').textContent = bookingState.selectedTime;
    document.getElementById('confirmationItem').textContent = booking.item;
    document.getElementById('confirmationSymptoms').textContent = booking.symptoms.join(', ') || '—';

    const confirmButton = document.getElementById('confirmBookingBtn');
    confirmButton.disabled = true;
    confirmButton.textContent = 'ยืนยันเรียบร้อย';

    showStage('confirmation');
  });

  document.getElementById('finishAndHome').addEventListener('click', () => {
    sessionStorage.removeItem('find2fixRepairRequest');
    sessionStorage.removeItem('find2fixSelectedTechnician');
    sessionStorage.removeItem('find2fixDemoBooking');
    window.location.href = 'index.html';
  });

  document.getElementById('newRepairSearch').addEventListener('click', () => {
    sessionStorage.removeItem('find2fixRepairRequest');
    sessionStorage.removeItem('find2fixSelectedTechnician');
    sessionStorage.removeItem('find2fixDemoBooking');
    window.location.href = 'search.html';
  });

  renderProfile();
  renderSchedule();
  updateBookingSummary();
  renderReview();
  sessionStorage.setItem('find2fixSelectedTechnician', JSON.stringify(technician));
  showStage('profile');
}

function formatThaiDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function getCategoryName(categoryId) {
  const category = window.FIND2FIX_DATA.categories.find((item) => item.id === categoryId);
  return category ? category.name : '—';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getInitials(name) {
  return name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
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
