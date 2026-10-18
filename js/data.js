window.FIND2FIX_DATA = {
  categories: [
    { id: 'appliance', name: 'เครื่องใช้ไฟฟ้า', symptoms: ['เปิดไม่ติด', 'ทำงานผิดปกติ', 'มีเสียงผิดปกติ'] },
    { id: 'electronics', name: 'อุปกรณ์อิเล็กทรอนิกส์', symptoms: ['เปิดไม่ติด', 'ปุ่มหรือพอร์ตเสีย', 'การเชื่อมต่อมีปัญหา'] },
    { id: 'bike', name: 'จักรยาน', symptoms: ['เบรกมีปัญหา', 'ยางรั่ว', 'โซ่หลุดหรือเปลี่ยนเกียร์ไม่ได้'] },
    { id: 'furniture', name: 'เฟอร์นิเจอร์', symptoms: ['ขาหัก', 'โครงหลวม', 'บานพับเสีย'] },
    { id: 'home', name: 'ของใช้ในบ้าน', symptoms: ['แตกหรือหัก', 'ชิ้นส่วนหลุด', 'ใช้งานไม่ได้'] }
  ],
  technicians: [
    {
      id: 'tech-001',
      name: 'นภัสสรณ์ คงดี',
      specialty: 'ซ่อมเครื่องใช้ไฟฟ้าและอุปกรณ์ครัว',
      categories: ['appliance', 'home'],
      skills: ['เปิดไม่ติด', 'ทำงานผิดปกติ', 'มีเสียงผิดปกติ', 'ชิ้นส่วนหลุด'],
      serviceAreas: ['ยานนาวา', 'บางกะปิ', 'วังทองหลาง'],
      biography: 'ช่างซ่อมที่เน้นการแก้ปัญหาด้วยเทคนิคง่ายและตรวจเช็กให้ผู้ใช้เข้าใจทุกขั้นตอน',
      workSamples: ['เครื่องซักผ้าหยุดทำงาน', 'เตาไมโครเวฟเสีย', 'ชักโครกอัดลม'],
      priceRange: '฿350 - ฿1,200',
      rating: 4.8,
      availability: [
        { date: '2026-10-20', slots: [{ time: '09:00', available: true }, { time: '11:30', available: true }, { time: '14:00', available: false }, { time: '16:30', available: true }] },
        { date: '2026-10-21', slots: [{ time: '09:30', available: true }, { time: '12:00', available: false }, { time: '15:00', available: true }, { time: '17:00', available: true }] },
        { date: '2026-10-22', slots: [{ time: '10:00', available: true }, { time: '13:30', available: true }, { time: '15:30', available: false }, { time: '18:00', available: true }] }
      ],
      profileImage: ''
    },
    {
      id: 'tech-002',
      name: 'ปกรณ์ สวัสดิ์',
      specialty: 'ซ่อมอุปกรณ์อิเล็กทรอนิกส์และเคเบิล',
      categories: ['electronics', 'appliance'],
      skills: ['เปิดไม่ติด', 'ปุ่มหรือพอร์ตเสีย', 'การเชื่อมต่อมีปัญหา', 'ทำงานผิดปกติ'],
      serviceAreas: ['ดอนเมือง', 'สาทร', 'บางซื่อ'],
      biography: 'มีประสบการณ์ด้านอุปกรณ์อิเล็กทรอนิกส์และการเชื่อมต่อ ทำงานได้เร็วและบอกอาการชัดเจน',
      workSamples: ['ลำโพงบลูทูธ', 'คอมพิวเตอร์ตั้งโต๊ะ', 'ชาร์จเจอร์มือถือ'],
      priceRange: '฿450 - ฿1,500',
      rating: 4.7,
      availability: [
        { date: '2026-10-20', slots: [{ time: '08:30', available: true }, { time: '10:30', available: true }, { time: '13:00', available: false }, { time: '17:30', available: true }] },
        { date: '2026-10-21', slots: [{ time: '09:00', available: true }, { time: '11:00', available: true }, { time: '14:30', available: true }, { time: '16:00', available: false }] },
        { date: '2026-10-22', slots: [{ time: '09:30', available: false }, { time: '12:30', available: true }, { time: '15:00', available: true }, { time: '18:30', available: true }] }
      ],
      profileImage: ''
    },
    {
      id: 'tech-003',
      name: 'วิทยา บุญมี',
      specialty: 'ซ่อมจักรยานและระบบเบรก',
      categories: ['bike'],
      skills: ['เบรกมีปัญหา', 'ยางรั่ว', 'โซ่หลุดหรือเปลี่ยนเกียร์ไม่ได้'],
      serviceAreas: ['พระโขนง', 'คลองสามวา', 'ลาดกระบัง'],
      biography: 'ช่างจักรยานที่มีความละเอียดเรื่องช่วงล่างและระบบเบรก ให้คำแนะนำเรื่องการดูแลและการบำรุงรักษา',
      workSamples: ['จักรยานเสือภูเขา', 'จักรยานไฟฟ้า', 'ระบบเบรกดิสก์'],
      priceRange: '฿300 - ฿1,000',
      rating: 4.9,
      availability: [
        { date: '2026-10-20', slots: [{ time: '07:30', available: true }, { time: '09:30', available: true }, { time: '12:00', available: false }, { time: '15:00', available: true }] },
        { date: '2026-10-21', slots: [{ time: '08:00', available: true }, { time: '10:00', available: false }, { time: '13:30', available: true }, { time: '17:00', available: true }] },
        { date: '2026-10-22', slots: [{ time: '09:00', available: true }, { time: '11:30', available: true }, { time: '14:30', available: true }, { time: '16:30', available: false }] }
      ],
      profileImage: ''
    },
    {
      id: 'tech-004',
      name: 'อริสรา มั่นคง',
      specialty: 'ซ่อมเฟอร์นิเจอร์และชิ้นส่วนไม้',
      categories: ['furniture', 'home'],
      skills: ['ขาหัก', 'โครงหลวม', 'บานพับเสีย', 'แตกหรือหัก'],
      serviceAreas: ['ห้วยขวาง', 'พญาไท', 'ราชเทวี'],
      biography: 'รับซ่อมเฟอร์นิเจอร์และของใช้ในบ้านที่ต้องการความละเอียด โดยเน้นการซ่อมที่คงสภาพและใช้งานได้นาน',
      workSamples: ['โต๊ะทำงาน', 'ตู้หนังสือ', 'เฟอร์นิเจอร์บานเลื่อน'],
      priceRange: '฿500 - ฿1,800',
      rating: 4.8,
      availability: [
        { date: '2026-10-20', slots: [{ time: '10:00', available: true }, { time: '12:30', available: true }, { time: '15:00', available: false }, { time: '17:30', available: true }] },
        { date: '2026-10-21', slots: [{ time: '09:00', available: false }, { time: '11:00', available: true }, { time: '13:00', available: true }, { time: '16:00', available: true }] },
        { date: '2026-10-22', slots: [{ time: '08:30', available: true }, { time: '10:30', available: true }, { time: '14:00', available: false }, { time: '18:00', available: true }] }
      ],
      profileImage: ''
    },
    {
      id: 'tech-005',
      name: 'ชยุตม์ แสงทอง',
      specialty: 'ซ่อมของใช้ในบ้านและเครื่องใช้ทั่วไป',
      categories: ['home', 'appliance'],
      skills: ['ใช้งานไม่ได้', 'ชิ้นส่วนหลุด', 'เปิดไม่ติด', 'ทำงานผิดปกติ'],
      serviceAreas: ['บางเขน', 'บางกะปิ', 'มีนบุรี'],
      biography: 'ช่างซ่อมประจำบ้านที่คุ้นเคยกับปัญหาเล็ก ๆ เช่น เครื่องใช้ในครัว ของใช้ประจำวัน และเฟอร์นิเจอร์ที่หยุดใช้งาน',
      workSamples: ['พัดลมเสีย', 'เก้าอี้ชำรุด', 'ตู้เย็นเบา'],
      priceRange: '฿280 - ฿950',
      rating: 4.6,
      availability: [
        { date: '2026-10-20', slots: [{ time: '09:00', available: true }, { time: '11:00', available: false }, { time: '15:30', available: true }, { time: '18:00', available: true }] },
        { date: '2026-10-21', slots: [{ time: '08:30', available: true }, { time: '10:30', available: true }, { time: '14:00', available: true }, { time: '16:30', available: false }] },
        { date: '2026-10-22', slots: [{ time: '09:30', available: false }, { time: '12:00', available: true }, { time: '15:30', available: true }, { time: '17:30', available: true }] }
      ],
      profileImage: ''
    },
    {
      id: 'tech-006',
      name: 'สุรินทร์ ผ่องศรี',
      specialty: 'ซ่อมอุปกรณ์อิเล็กทรอนิกส์และระบบสื่อสาร',
      categories: ['electronics', 'appliance'],
      skills: ['การเชื่อมต่อมีปัญหา', 'เปิดไม่ติด', 'ปุ่มหรือพอร์ตเสีย', 'ทำงานผิดปกติ'],
      serviceAreas: ['ศิริราช', 'หนองจอก', 'คลองสาน'],
      biography: 'ช่างที่มีความถนัดเรื่องอุปกรณ์อิเล็กทรอนิกส์และการตรวจวินิจฉัยสัญญาณที่ทำให้ลูกค้าเข้าใจสถานการณ์',
      workSamples: ['เครื่องเล่นเกม', 'อุปกรณ์เสียง', 'จอแสดงผล'],
      priceRange: '฿400 - ฿1,400',
      rating: 4.7,
      availability: [
        { date: '2026-10-20', slots: [{ time: '08:00', available: true }, { time: '10:00', available: true }, { time: '13:30', available: false }, { time: '17:00', available: true }] },
        { date: '2026-10-21', slots: [{ time: '09:30', available: true }, { time: '12:30', available: true }, { time: '15:00', available: false }, { time: '18:30', available: true }] },
        { date: '2026-10-22', slots: [{ time: '10:00', available: true }, { time: '12:00', available: false }, { time: '14:30', available: true }, { time: '16:00', available: true }] }
      ],
      profileImage: ''
    }
  ]
};
