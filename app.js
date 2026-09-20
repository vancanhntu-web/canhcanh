function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const msg = document.getElementById("toast-msg");
  msg.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function updateActiveNav(navId) {
  document
    .querySelectorAll("nav ul li a")
    .forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(navId);
  if (target) target.classList.add("active");
}

// --- ĐIỀU KHIỂN DROPDOWN MENU CHÍNH & SUB-MENU ---
function toggleDropdown(event, dropdownId) {
  event.stopPropagation();
  const dropdown = document.getElementById(dropdownId);
  const isOpen = dropdown.classList.contains("show");
  closeAllDropdowns();
  if (!isOpen) {
    dropdown.classList.add("show");
  }
}

function toggleSubDropdown(event, subDropdownId) {
  event.stopPropagation();
  const subDropdown = document.getElementById(subDropdownId);
  const isOpen = subDropdown.classList.contains("show");
  document
    .querySelectorAll(".sub-dropdown-content")
    .forEach((el) => el.classList.remove("show"));
  if (!isOpen) {
    subDropdown.classList.add("show");
  }
}

function closeAllDropdowns() {
  document
    .querySelectorAll(".dropdown-content")
    .forEach((el) => el.classList.remove("show"));
  document
    .querySelectorAll(".sub-dropdown-content")
    .forEach((el) => el.classList.remove("show"));
}

window.addEventListener("click", function () {
  closeAllDropdowns();
});

// --- DỮ LIỆU & ĐIỀU KHIỂN PHÂN TRANG HOẠT ĐỘNG NGOẠI KHÓA ---
const activitiesList = [
  {
    title: "Public Speaking Competition – Cuộc Thi Hùng Biện",
    desc: "Sân chơi lớn giúp các em rèn luyện sự tự tin, phong thái thuyết trình trước đám đông.",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
    toast: "Đã mở xem chi tiết: Cuộc thi hùng biện tiếng Anh",
  },
  {
    title: "English Summer Camp – Trại hè tiếng Anh",
    desc: "Chương trình hè kết hợp học tiếng Anh với trò chơi, hoạt động trải nghiệm, kỹ năng sống, teamwork và khám phá.",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
    toast: "Đã mở xem chi tiết: Hoạt động ngoại khóa dã ngoại",
  },
  {
    title: "English Challenge – Thử thách tiếng Anh",
    desc: "Các hoạt động thi đấu về từ vựng, phát âm, nghe hiểu, phản xạ và kiến thức tiếng Anh theo từng độ tuổi.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    toast: "Đã mở xem chi tiết: Hội thảo kỹ năng toàn cầu",
  },
  {
    title: "Ha Teacher English Club – Câu lạc bộ tiếng Anh",
    desc: "Sinh hoạt định kỳ thông qua trò chơi, thuyết trình, đóng vai, kể chuyện, tranh biện và các hoạt động nhóm.",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
    toast: "Đã mở xem chi tiết: Câu Lạc Bộ Tiếng Nói 360",
  },
  {
    title: "Student Achievement Day – Ngày hội vinh danh học viên",
    desc: "Vinh danh học viên có thành tích nổi bật, tiến bộ tốt, chăm chỉ, tích cực giao tiếp và có đóng góp trong các hoạt động của lớp.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
    toast: "Đã mở xem chi tiết: Lễ Vinh Danh & Trao Chứng Chỉ",
  },
  {
    title: "English Field Trip – Học tiếng Anh qua trải nghiệm",
    desc: "Đưa tiếng Anh ra khỏi lớp học thông qua các chuyến tham quan, hoạt động thực tế và nhiệm vụ giao tiếp.",
    img: "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/514715732_122128452176724540_1736641482468318449_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2PkoXJ0IuxsQ7kNvwHPIEZ3&_nc_oc=AdperQQCSOJ7M4_VohpkiQCHtEQmcWEKxL4KEuo_Yhl3cQ6U5caOSpg_VIXQ7uTqvx75QgtplIImRLkSD1NaobLt&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=Hztah46Gr2ajjeaTMpbDUw&_nc_ss=7b2a8&oh=00_AQKwbtB6lGfL5wtZUKVBKtGqs00FTQ2QZkU2cf-MqvBlDA&oe=6AB1D745",
    toast: "Đã mở xem chi tiết: Hoạt Động Ngoại Khóa Sáng Tạo",
  },
];
let currentActivityPage = 0;
const activitiesPerPage = 6;

function renderActivitiesPage() {
  const container = document.getElementById("activities-container");
  if (!container) return;

  const start = currentActivityPage * activitiesPerPage;
  const end = start + activitiesPerPage;
  const sliceItems = activitiesList.slice(start, end);

  let html = "";
  sliceItems.forEach((item) => {
    html += `
      <div class="activity-card" onclick="showToast('${item.toast}')">
          <div class="activity-img-wrapper">
              <img src="${item.img}" class="activity-img" alt="${item.title}">
          </div>
          <div class="activity-content">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
          </div>
      </div>
    `;
  });
  container.innerHTML = html;

  const prevBtn = document.getElementById("prev-activity-btn");
  const nextBtn = document.getElementById("next-activity-btn");
  if (prevBtn && nextBtn) {
    prevBtn.style.opacity = currentActivityPage === 0 ? "0.5" : "1";
    prevBtn.style.cursor =
      currentActivityPage === 0 ? "not-allowed" : "pointer";

    nextBtn.style.opacity = end >= activitiesList.length ? "0.5" : "1";
    nextBtn.style.cursor =
      end >= activitiesList.length ? "not-allowed" : "pointer";
  }
}

function prevActivity() {
  if (currentActivityPage > 0) {
    currentActivityPage--;
    renderActivitiesPage();
  }
}

function nextActivity() {
  if ((currentActivityPage + 1) * activitiesPerPage < activitiesList.length) {
    currentActivityPage++;
    renderActivitiesPage();
  }
}

// --- ĐIỀU HƯỚNG TRANG CHÍNH ---
function showPage(pageId) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const contentArea = document.getElementById("content-area");

  if (pageId === "home") {
    updateActiveNav("nav-home");
    contentArea.innerHTML = `
              <div class="hero">
                  <div class="hero-text">
                      <h1>Chinh Phục Thế Giới Cùng</h1>
                      <h1><span>Ha Teacher</span></h1>
                      <p>Không ngừng đổi mới – bứt phá – dẫn đầu trong đào tạo ngoại ngữ tại khu vực xã Gò Nổi.</p>
                      <p>Kiến tạo môi trường học tập hiện đại, truyền cảm hứng và đánh thức tiềm năng mỗi học viên..</p>
                      <p>Bứt phá giới hạn – làm chủ ngoại ngữ – tự tin vươn tầm quốc tế.</p>
                      <button class="btn-primary" onclick="showPage('tuyensinh')">Bắt đầu hành trình ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                  <div class="hero-image">
                      <img src="trangbia.png" alt="Học viên Ha Teacher">
                  </div>
              </div>
              <div class="card">
                  <h2 class="section-title"><i class="fa-solid fa-compass" style="color: var(--accent);"></i> Lộ Trình Đào Tạo Chuẩn Quốc Tế</h2>
                  <p style="color: #0000FF; font-size: 18px; margin-bottom: 25px;">Ha Teacher xây dựng lộ trình đào tạo tiếng Anh bài bản, khoa học và phù hợp với từng độ tuổi, trình độ và mục tiêu học tập. Mỗi cấp độ được thiết kế như một bước tiến liên tục, giúp học viên củng cố nền tảng, mở rộng kiến thức và phát triển toàn diện các kỹ năng Nghe – Nói – Đọc – Viết.</p>
                  <p style="color: #0000FF ; font-size: 18px; margin-bottom: 25px;">Không chỉ chú trọng kiến thức, Ha Teacher hướng đến khả năng sử dụng tiếng Anh thực tế và giao tiếp tự tin. Qua từng giai đoạn, học viên được phát triển năng lực ngôn ngữ, tư duy và khả năng vận dụng, từ đó hình thành nền tảng vững chắc để học tập hiệu quả, hội nhập và tự tin chinh phục những mục tiêu cao hơn trong tương lai.</p>
                  <div class="grid-list">
                      <div class="grid-item" onclick="showCourseSub('mamnon')"><span><i class="fa-solid fa-child" style="margin-right: 10px; color: var(--accent);"></i> Tiếng Anh Mầm Non</span> <i class="fa-solid fa-chevron-right"></i></div>
                      <div class="grid-item" onclick="showCourseSub('thieunhi')"><span><i class="fa-solid fa-child-reaching" style="margin-right: 10px; color: var(--accent);"></i> Tiếng Anh Tiểu học</span> <i class="fa-solid fa-chevron-right"></i></div>
                      <div class="grid-item" onclick="showCourseSub('thieunien')"><span><i class="fa-solid fa-user-graduate" style="margin-right: 10px; color: var(--accent);"></i> Tiếng Anh THCS - THPT</span> <i class="fa-solid fa-chevron-right"></i></div>
                      <div class="grid-item" onclick="showPage('grammar')"><span><i class="fa-solid fa-spell-check" style="margin-right: 10px; color: var(--accent);"></i> Ngữ Pháp</span> <i class="fa-solid fa-chevron-right"></i></div>
                  </div>
              </div>

              <div class="card">
                  <h2 class="section-title"><i class="fa-solid fa-bolt" style="color: var(--secondary);"></i> Hoạt Động Nổi Bật Tại Trung Tâm</h2>
                  <p style="color:  #0000FF; font-size: 18px; margin-bottom: 25px;">Môi trường học tập năng động, rèn luyện kỹ năng thực tế mỗi ngày tại Ha Teacher.</p>
                  <div class="activities-grid">
                      <div class="activity-card" onclick="showPage('hoatdong')">
                          <div class="activity-img-wrapper">
                              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="CLB">
                          </div>
                          <div class="activity-content">
                              <h3>Câu Lạc Bộ Tiếng Nói 360</h3>
                              <p>Không gian giao lưu phản xạ tự nhiên, giúp học viên tự tin tranh biện các chủ đề toàn cầu.</p>
                          </div>
                      </div>
                      <div class="activity-card" onclick="showPage('hoatdong')">
                          <div class="activity-img-wrapper">
                              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="Vinh danh">
                          </div>
                          <div class="activity-content">
                              <h3>Lễ Vinh Danh & Trao Chứng Chỉ</h3>
                              <p>Khắc ghi những mốc son thành công rực rỡ và tiếp thêm động lực vươn tới những đỉnh cao mới.</p>
                          </div>
                      </div>
                      <div class="activity-card" onclick="showPage('hoatdong')">
                          <div class="activity-img-wrapper">
                              <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="Ngoại khóa">
                          </div>
                          <div class="activity-content">
                              <h3>Hoạt Động Ngoại Khóa Sáng Tạo</h3>
                              <p>Các chương trình dã ngoại và hội thảo tiếng Anh thực tế giúp gắn kết tình bạn và rèn luyện kỹ năng mềm.</p>
                          </div>
                      </div>
                  </div>
              </div>
          `;
  } else if (pageId === "hoatdong") {
    updateActiveNav("nav-hoatdong");
    contentArea.innerHTML = `
              <div class="card">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 12px;">
                      <h2 class="section-title" style="margin-bottom: 0;"><i class="fa-solid fa-bolt" style="color: var(--secondary);"></i> Hoạt Động Ngoại Khóa & Sự Kiện</h2>
                      <div style="display: flex; gap: 10px;">
                          <button id="prev-activity-btn" onclick="prevActivity()" class="back-btn" style="margin-bottom: 0; padding: 10px 18px;"><i class="fa-solid fa-arrow-left"></i> Hoạt động trước</button>
                          <button id="next-activity-btn" onclick="nextActivity()" class="back-btn" style="margin-bottom: 0; padding: 10px 18px;">Hoạt động sau <i class="fa-solid fa-arrow-right"></i></button>
                      </div>
                  </div>
                  <p style="font-size: 17px; line-height: 1.8; color: var(--text-muted); margin-bottom: 30px;">
                      Tại Ha Teacher, chúng tôi thường xuyên tổ chức các hoạt động trải nghiệm thực tế giúp học viên ứng dụng linh hoạt ngoại ngữ vào đời sống hàng ngày.
                  </p>
                  <div class="activities-grid" id="activities-container">
                  </div>
              </div>
          `;
    renderActivitiesPage();
  } else if (pageId === "grammar") {
    updateActiveNav("nav-courses");
    contentArea.innerHTML = `
              <button class="back-btn" onclick="showPage('home')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
              <div class="card">
                  <h2 class="section-title"><i class="fa-solid fa-spell-check"></i> Khóa học: Ngữ pháp</h2>
                  <p style="color: var(--text-muted); margin-bottom: 20px;">Hệ thống sơ đồ tư duy ngữ pháp từ gốc rễ đến nâng cao.</p>
                  <div class="grid-list">
                      <div class="grid-item" onclick="showToast('Đang tải bài giảng: Ngữ pháp cơ bản')"><span>Ngữ pháp cơ bản</span><i class="fa-solid fa-arrow-right"></i></div>
                      <div class="grid-item" onclick="showToast('Đang tải bài giảng: Ngữ pháp nâng cao')"><span>Ngữ pháp nâng cao</span><i class="fa-solid fa-arrow-right"></i></div>
                      <div class="grid-item" onclick="showToast('Đang tải hệ thống bài tập thực hành')"><span>Bài tập thực hành</span><i class="fa-solid fa-arrow-right"></i></div>
                  </div>
              </div>
          `;
  } else if (pageId === "luyenthi") {
    updateActiveNav("nav-courses");
    if (typeof renderLuyenThiMenu === "function") {
      renderLuyenThiMenu();
    }
  } else if (pageId === "tuyensinh") {
    updateActiveNav("nav-tuyensinh");
    contentArea.innerHTML = `
              <div class="card" style="padding: 30px; margin-bottom: 30px;">
                <h2 class="section-title" style="margin-bottom: 12px;"><i class="fa-solid fa-bullhorn"></i> Thông Tin Tuyển Sinh Các Lớp Tiếng Anh</h2>
                <p style="font-size: 16px; line-height: 1.6; color: var(--text-muted); margin-bottom: 0;">
                  Các chương trình <strong>Tiếng Anh Mầm non – Tiểu học – THCS – THPT</strong>, được thiết kế theo lộ trình phát triển năng lực rõ ràng, phù hợp với từng độ tuổi và trình độ.
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
                <!-- Lớp 1 -->
                <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 220px; overflow: hidden;">
                    <img src="mamnon.png" alt="Tiếng Anh Mầm Non" style="width: 100%; height: 120%; object-fit: cover;">
                  </div>
                  <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Tiếng Anh Mầm Non (4-6 tuổi)</h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
                      Chương trình học thiết kế đặc biệt giúp các bé làm quen với tiếng Anh tự nhiên, phát âm chuẩn cùng giáo viên nước ngoài và phát triển kỹ năng phản xạ linh hoạt ngay từ nhỏ.
                    </p>
                    <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tsmamnon.html', '_blank')">Đăng ký ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>

                <!-- Lớp 2 -->
                <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 220px; overflow: hidden;">
                    <img src="thieunhi.png" alt="Tiếng Anh Thiếu Nhi" style="width: 100%; height: 120%; object-fit: cover;">
                  </div>
                  <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Tiếng Anh Tiểu học (Lớp 1 - Lớp 5)</h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
                      Xây dựng nền tảng từ vựng, ngữ pháp vững chắc, luyện phát âm chuẩn quốc tế và phát triển toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết theo chuẩn Cambridge.
                    </p>
                    <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tsthieunhi.html', '_blank')">Đăng ký ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>

                <!-- Lớp 3 -->
                <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 220px; overflow: hidden;">
                    <img src="thieunien.png" alt="Tiếng Anh Thiếu Niên" style="width: 100%; height: 120%; object-fit: cover;">
                  </div>
                  <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Tiếng Anh Thiếu Niên (Lớp 6 - Lớp 12)</h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
                      Bổ trợ kiến thức bám sát chương trình phổ thông, luyện thi chuyển cấp, luyện thi học sinh giỏi và xây dựng năng lực tư duy phản biện bằng tiếng Anh.
                    </p>
                    <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tsthieunien.html', '_blank')">Đăng ký ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
                <!-- Lớp 4 -->
                <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 220px; overflow: hidden;">
                    <img src="ioe.png" alt="Luyện thi IOE - Tiểu học" style="width: 100%; height: 120%; object-fit: cover;">
                  </div>
                  <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Luyện thi IOE - Tiểu học</h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
                      Chương trình dành cho học sinh Tiểu học, THCS (nếu có nhu cầu), tập trung phát triển vốn từ vựng, ngữ pháp, khả năng phản xạ tiếng Anh và kỹ năng xử lý các dạng bài thường gặp trong kỳ thi IOE (Internet Olympiads of English).
                    </p>
                    <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tsioe.html', '_blank')">Đăng ký ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
                <!-- Lớp 5 -->
                <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 220px; overflow: hidden;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVzEej5a9PrTT-OQhXV_71GEqxMOoDoE2LBE59HvyJPylsRzl-SChEL-0&s=10" alt="Luyện thi chứng chỉ VSTEP" style="width: 100%; height: 100%; object-fit: cover;">
                  </div>
                  <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Luyện thi chứng chỉ VSTEP (A1,A2)</h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
                      Chương trình luyện thi A1 – A2 dành cho học viên cần củng cố nền tảng tiếng Anh và phát triển năng lực theo Khung tham chiếu trình độ ngôn ngữ chung Châu Âu (CEFR).
                    </p>
                    <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tsa1a2.html', '_blank')">Đăng ký ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>

                <!-- Lớp 6 -->
                <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 220px; overflow: hidden;">
                    <img src="https://ngoainguhanoi.com/wp-content/uploads/2016/12/dai-dien-cac-loai-chung-chi-tieng-anh.png" alt="Luyện Thi Chứng Chỉ Quốc Tế" style="width: 100%; height: 100%; object-fit: cover;">
                  </div>
                  <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Luyện Thi Chứng Chỉ Quốc Tế</h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
                      Chương trình luyện thi chuyên sâu các chứng chỉ IELTS, TOEIC, TOEFL và các chứng chỉ Cambridge (Starters, Movers, Flyers) với cam kết đầu ra rõ ràng.
                    </p>
                    <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tscc.html', '_blank')">Đăng ký ngay <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
              </div>
          `;
  } else if (pageId === "feedback") {
    showFeedbackPage(1);
  }
}

// --- MENU GIỚI THIỆU & CÔNG KHAI ---
function showAboutSub(type) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateActiveNav("nav-about");
  const contentArea = document.getElementById("content-area");

  if (type === "tongquan") {
    contentArea.innerHTML = `
              <button class="back-btn" onclick="showPage('home')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
              <div class="card">
                  <h2 class="section-title"><i class="fa-solid fa-building-columns"></i> Tổng quan về Ha Teacher</h2>
                  <div style="font-size: 17px; line-height: 1.8; color: var(--text-main);">
                      <h3 style="color: var(--accent); margin-bottom: 20px; font-size: 22px; font-weight: 800;">
                          HA TEACHER – CHINH PHỤC THẾ GIỚI BẰNG NGOẠI NGỮ
                      </h3>
                      <p style="margin-bottom: 16px;">
                          Ha Teacher là trung tâm ngoại ngữ định hướng xây dựng môi trường học tiếng Anh hiện đại, chủ động và giàu cảm hứng, nơi mỗi học viên được phát triển năng lực ngoại ngữ một cách vững chắc và từng bước tự tin sử dụng tiếng Anh trong học tập, giao tiếp và cuộc sống.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                          Với phương châm <em>“Học để hiểu – Học để dùng – Học để vươn xa”</em>, Ha Teacher không chỉ tập trung vào kiến thức từ vựng và ngữ pháp mà chú trọng phát triển toàn diện các kỹ năng Nghe – Nói – Đọc – Viết, khả năng phản xạ giao tiếp, tư duy ngôn ngữ và sự tự tin của người học.
                      </p>
                      <div style="margin: 30px 0; text-align: center;">
                          <img src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/702996244_122153679014724540_3321341266730750666_n.jpg?stp=dst-jpg_tt6&cstp=mx1050x1498&ctp=s1050x1498&_nc_cat=104&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=e1WG1ynCsYYQ7kNvwHbWxZt&_nc_oc=Ado3Q8MQBmSqiILKPTjaV9ULBalwftUjX0Nk70xh98LkQWdncGmyTP37KD5rdrC-cfI0H_PvRntgcy68Wi_KlM6f&_nc_zt=23&_nc_ht=scontent.fdad1-3.fna&_nc_gid=nYNjRsZFkOJVsJehjunpkg&_nc_ss=7b2a8&oh=00_AQJjoaMjn3QWVepiUJ8ak7WUnRovJjoQKn0GKoyLVTXtGA&oe=6AB1F428" alt="Trung tâm ngoại ngữ Ha Teacher" style="width: 100%; max-height: 450px; object-fit: cover; border-radius: var(--radius-md); box-shadow: 0 15px 35px rgba(0,0,0,0.1);">
                          <p style="text-align: center; font-size: 14px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Kỷ niệm một năm ngày thành lập Trung tâm Ngoại ngữ Ha Teacher</p>
                      </div>
                      <p style="text-align: justify; margin-bottom: 16px;">
                          Các chương trình đào tạo được xây dựng phù hợp với từng độ tuổi và trình độ, từ tiếng Anh thiếu nhi, tiếng Anh tiểu học, THCS, THPT đến các chương trình luyện thi và phát triển năng lực giao tiếp. Nội dung học tập được tổ chức theo lộ trình rõ ràng, kết hợp giữa giáo trình, hoạt động tương tác, thực hành giao tiếp và các hình thức học tập trực quan nhằm giúp học viên tiếp thu kiến thức tự nhiên và duy trì hứng thú trong suốt quá trình học.
                      </p>
                      <p style="text-align: justify; font-weight: 700; color: var(--primary); margin-top: 20px;">
                          Không ngừng đổi mới phương pháp – Không ngừng nâng cao chất lượng – Không ngừng truyền cảm hứng, Ha Teacher đồng hành cùng học viên trên hành trình xây dựng nền tảng ngoại ngữ vững chắc, mở rộng cơ hội học tập và tự tin vươn xa trong một thế giới ngày càng kết nối.
                      </p>
                  </div>
              </div>
          `;
  } else if (type === "tamnhin") {
    contentArea.innerHTML = `
              <button class="back-btn" onclick="showPage('home')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
              <div class="card">
                  <div style="display: flex; flex-direction: column; gap: 40px;">
                      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center;">
                          <div>
                              <h2 class="section-title" style="margin-bottom: 20px;"><i class="fa-solid fa-eye" style="color: var(--accent);"></i> Tầm Nhìn</h2>
                              <p style="text-align: justify; font-size: 17px; line-height: 1.8; color: var(--text-muted);">
                                  Ha Teacher hướng đến trở thành trung tâm đào tạo tiếng Anh chuyên nghiệp, uy tín và tiên phong tại khu vực, với chiến lược phát triển bền vững và không ngừng đổi mới chương trình, phương pháp giảng dạy và công nghệ giáo dục. Chúng tôi cam kết xây dựng môi trường học tập chất lượng, truyền cảm hứng, phù hợp với từng độ tuổi và mục tiêu, lấy sự tiến bộ của học viên làm trọng tâm, đồng hành tận tâm và mang đến hiệu quả học tập thực chất, giúp học viên vững nền tảng tiếng Anh, tự tin giao tiếp và sẵn sàng hội nhập quốc tế.
                              </p>
                          </div>
                          <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d);">
                              <img src="tamnhin.png" alt="Tầm nhìn Ha Teacher" style="width: 100%; height: 350px; object-fit: cover; display: block;">
                          </div>
                      </div>
                      <hr style="border: none; border-top: 1px solid #e2e8f0;">
                      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center;">
                          <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d); order: 1;">
                              <img src="sumenh.png" alt="Sứ mệnh Ha Teacher" style="width: 100%; height: 350px; object-fit: cover; display: block;">
                          </div>
                          <div style="order: 2;">
                              <h2 class="section-title" style="margin-bottom: 20px;"><i class="fa-solid fa-bullseye" style="color: var(--secondary);"></i> Sứ Mệnh</h2>
                              <p style="text-align: justify; font-size: 17px; line-height: 1.8; color: var(--text-muted);">
                                  Giáo dục là nền tảng quan trọng để mỗi cá nhân phát triển và tạo dựng tương lai. Trong bối cảnh tiếng Anh ngày càng trở thành một năng lực thiết yếu trong học tập, công việc và hội nhập quốc tế, nhu cầu về một môi trường đào tạo tiếng Anh chất lượng, bài bản và phù hợp với từng độ tuổi ngày càng được quan tâm. Xuất phát từ mong muốn đó, Ha Teacher được xây dựng với định hướng trở thành một cộng đồng học tập tiếng Anh chuyên nghiệp, nơi học viên được tiếp cận phương pháp giáo dục hiện đại, phát triển đồng đều kiến thức, kỹ năng giao tiếp và sự tự tin.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          `;
  } else if (type === "vatchat") {
    contentArea.innerHTML = `
              <button class="back-btn" onclick="showPage('home')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
              <div class="card">
                  <div style="display: flex; flex-direction: column; gap: 40px;">
                      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center;">
                          <div>
                              <h2 class="section-title" style="margin-bottom: 20px;"><i class="fa-solid fa-eye" style="color: var(--accent);"></i> Cơ sở vật chất</h2>
                              <p style="text-align: justify; font-size: 17px; line-height: 1.8; color: var(--text-muted);">
                                  Ha Teacher chú trọng xây dựng cơ sở vật chất khang trang, hiện đại và đồng bộ. Hệ thống phòng học được bố trí khoa học, phù hợp với từng độ tuổi học viên. Không gian được đảm bảo sạch sẽ, thoáng mát và an toàn trong quá trình học tập. Các khu vực chức năng được sắp xếp thuận tiện cho hoạt động giảng dạy và trải nghiệm. Trung tâm không ngừng hoàn thiện cơ sở vật chất theo nhu cầu học tập thực tế. Môi trường vật chất được đầu tư nhằm nâng cao chất lượng và hiệu quả đào tạo. Ha Teacher – kiến tạo nền tảng học tập chuyên nghiệp và hiện đại.
                              </p>
                          </div>
                          <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d);">
                              <img src="tamnhin.png" alt="Tầm nhìn Ha Teacher" style="width: 100%; height: 400px; object-fit: cover; display: block;">
                          </div>
                      </div>
                      <hr style="border: none; border-top: 1px solid #e2e8f0;">
                      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center;">
                          <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d); order: 1;">
                              <img src="sumenh.png" alt="Sứ mệnh Ha Teacher" style="width: 100%; height: 400px; object-fit: cover; display: block;">
                          </div>
                          <div style="order: 2;">
                              <h2 class="section-title" style="margin-bottom: 20px;"><i class="fa-solid fa-bullseye" style="color: var(--secondary);"></i> Trang thiết bị phục vụ </h2>
                              <p style="text-align: justify; font-size: 17px; line-height: 1.8; color: var(--text-muted);">
                                 Ha Teacher trang bị hệ thống thiết bị hỗ trợ giảng dạy và học tập đa dạng, tiện ích. Phòng học được trang bị Smart TV, máy chiếu, máy lạnh và hệ thống ánh sáng phù hợp. Máy tính và phòng máy hỗ trợ học viên học ngoại ngữ, tin học và kỹ năng công nghệ. Các thiết bị trực quan giúp giáo viên triển khai bài học sinh động và hiệu quả hơn. Thiết bị được sử dụng linh hoạt cho hoạt động nghe, nói, tương tác và thực hành. Hệ thống trang thiết bị góp phần tạo nên trải nghiệm học tập hiện đại, thuận tiện. Ha Teacher – công nghệ đồng hành cùng mỗi bài học.
                              </p>
                          </div>                          
                      </div>
                  </div>
                  <div class="card">
                  <div style="display: flex; flex-direction: column; gap: 40px;">
                      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center;">
                          <div>
                              <h2 class="section-title" style="margin-bottom: 20px;"><i class="fa-solid fa-eye" style="color: var(--accent);"></i> Hệ sinh thái Ha Teacher</h2>
                              <p style="text-align: justify; font-size: 17px; line-height: 1.8; color: var(--text-muted);">
                                  Ha Teacher xây dựng hệ sinh thái học tập kết hợp lớp học trực tiếp và nền tảng số. Học viên có thể tiếp cận tài nguyên qua website hateacher.com và Fanpage HaTeacher. Thư viện số: Ebook hateacher cung cấp học liệu số phục vụ học tập và luyện tập. Thư viện hỗ trợ đọc sách, tra cứu và mở rộng kiến thức ngoài giờ học. Phòng máy tính tạo điều kiện tiếp cận công nghệ và các phương pháp học tập mới. Các nguồn tài nguyên được kết nối nhằm hỗ trợ học viên học tập mọi lúc, mọi nơi.
Ha Teacher – kết nối công nghệ, học liệu và tri thức trong một hệ sinh thái.
                              </p>
                          </div>
                          <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d);">
                              <img src="tamnhin.png" alt="Tầm nhìn Ha Teacher" style="width: 100%; height: 400px; object-fit: cover; display: block;">
                          </div>
                      </div>
                      <hr style="border: none; border-top: 1px solid #e2e8f0;">
                      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center;">
                          <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d); order: 1;">
                              <img src="sumenh.png" alt="Sứ mệnh Ha Teacher" style="width: 100%; height: 400px; object-fit: cover; display: block;">
                          </div>
                          <div style="order: 2;">
                              <h2 class="section-title" style="margin-bottom: 20px;"><i class="fa-solid fa-bullseye" style="color: var(--secondary);"></i> Không gian học tập</h2>
                              <p style="text-align: justify; font-size: 17px; line-height: 1.8; color: var(--text-muted);">
                                  Ha Teacher kiến tạo không gian học tập thân thiện, năng động và truyền cảm hứng. Phòng học được thiết kế thoải mái, tạo điều kiện để học viên tập trung và chủ động học tập. Không gian phù hợp cho các hoạt động cá nhân, làm việc nhóm và giao tiếp. Học viên được khuyến khích thực hành, tương tác và phát triển khả năng sáng tạo. Các khu vực học tập tạo cơ hội đọc sách, trải nghiệm và khám phá kiến thức. Môi trường tích cực giúp học viên thêm tự tin và hứng thú trong mỗi buổi học. Ha Teacher – nơi mỗi không gian đều hướng đến một trải nghiệm học tập hiệu quả.
                              </p>
                          </div>                          
                      </div>
                  </div>
              </div>
          `;
  }
}

function showCongKhai(type) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateActiveNav("nav-about");
  const contentArea = document.getElementById("content-area");
  let titles = {
    phaply: '<span style="color: #0000FF;">CÔNG KHAI PHÁP LÝ</span>',
    noidung:
      '<span style="color: #0000FF;">CÔNG KHAI NỘI DUNG VÀ CHƯƠNG TRÌNH ĐÀO TẠO</span>',
    giaovien:
      '<span style="color: #0000FF;">CÔNG KHAI QUẢN LÝ - GIÁO VIÊN</span>',
    hocphi: '<span style="color: #0000FF;">CÔNG KHAI HỌC PHÍ</span>',
    chatluong:
      '<span style="color: #0000FF;">CÔNG KHAI ĐẢM BÁO CHẤT LƯỢNG</span>',
  };

  let descriptions = {
    phaply: `
      <p style="text-align: justify; margin-bottom: 16px;">
        Trung tâm Ngoại ngữ Ha Teacher công khai các thông tin pháp lý liên quan đến quyết định thành lập, tên đơn vị, địa điểm hoạt động và người đứng đầu Trung tâm.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Các thông tin được công khai trên cơ sở hồ sơ, quyết định và văn bản pháp lý có liên quan, nhằm bảo đảm tính minh bạch và thuận tiện cho học viên, phụ huynh và các bên liên quan tra cứu.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Khi có thay đổi về quyết định thành lập, địa điểm, người đứng đầu hoặc các thông tin pháp lý khác, Trung tâm thực hiện rà soát, cập nhật và công khai theo tình hình thực tế và quy định hiện hành.
      </p>
    `,
    noidung: `
      <p style="text-align: justify; margin-bottom: 16px;">
        Trung tâm Ngoại ngữ Ha Teacher công khai các nội dung về chương trình đào tạo, mục tiêu, nội dung giảng dạy, giáo trình – tài liệu, phương pháp dạy học, thời lượng, tiến độ và hình thức kiểm tra đánh giá của các chương trình đang được tổ chức tại Trung tâm.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Khung chương trình được thiết kế bám sát chuẩn khung năng lực ngoại ngữ quốc tế, đồng thời được tối ưu hóa để phù hợp với tâm sinh lý và năng lực tiếp thu của học viên Việt Nam ở từng độ tuổi khác nhau từ Mầm non, Thiếu nhi cho đến Thiếu niên và Luyện thi chuyên sâu.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Mọi thay đổi, cập nhật hoặc điều chỉnh về nội dung học tập, giáo trình mới đều được thông báo công khai rõ ràng trước mỗi khóa học mới để học viên và phụ huynh dễ dàng theo dõi.
      </p>
    `,
    giaovien: `
      <p style="text-align: justify; margin-bottom: 16px;">
        Trung tâm Ngoại ngữ Ha Teacher công khai thông tin về đội ngũ Quản lý - Giáo viên đang tham gia giảng dạy, gồm họ tên, trình độ chuyên môn và chứng chỉ.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Giáo viên được phân công phù hợp với chuyên môn, năng lực, kinh nghiệm và chương trình giảng dạy, nhằm bảo đảm chất lượng và hiệu quả đào tạo tối ưu cho từng lớp học.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Danh sách giáo viên được thường xuyên rà soát và cập nhật theo tình hình nhân sự và phân công giảng dạy thực tế của Trung tâm, đảm bảo sự minh bạch và chuyên nghiệp tuyệt đối trong công tác nhân sự giáo dục.
      </p>
    `,
    hocphi: `
      <p style="text-align: justify; margin-bottom: 16px;">
        Trung tâm Ngoại ngữ Ha Teacher công khai mức học phí, số buổi học, phương thức thu và nguyên tắc tính học phí nhằm bảo đảm sự rõ ràng, minh bạch đối với học viên và phụ huynh.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Học phí được tính theo số buổi học thực tế, đồng thời Trung tâm áp dụng các chính sách hỗ trợ, giảm học phí dành cho anh chị em cùng học, học viên giới thiệu bạn và học viên có hoàn cảnh khó khăn theo quy định của Trung tâm.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Mức học phí và các chính sách hỗ trợ được công khai, thông báo rõ ràng và cập nhật khi có thay đổi, tạo điều kiện thuận lợi để học viên và phụ huynh chủ động nắm bắt thông tin.
      </p>
    `,
    chatluong: `
      <p style="text-align: justify; margin-bottom: 16px;">
        Trung tâm Ngoại ngữ Ha Teacher công khai các nội dung về chương trình giảng dạy, đội ngũ giáo viên, giáo trình – học liệu, cơ sở vật chất và môi trường học tập nhằm bảo đảm các điều kiện phục vụ hoạt động đào tạo.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
       Trung tâm thực hiện kiểm tra, đánh giá kết quả học tập, theo dõi sự tiến bộ của học viên và rà soát chất lượng giảng dạy. Ý kiến phản hồi của học viên và phụ huynh được tiếp nhận để hỗ trợ và cải tiến hoạt động đào tạo.
      </p>
      <p style="text-align: justify; margin-bottom: 16px;">
        Các hoạt động đảm bảo chất lượng được thường xuyên kiểm tra, rà soát và cập nhật, phù hợp với chương trình đào tạo, điều kiện thực tế và phạm vi hoạt động của Trung tâm.
      </p>
    `,
  };

  let detailsHTML = "";
  if (type === "phaply") {
    detailsHTML = `
              <div class="grid-list" style="margin-top: 25px;">
                  <div class="grid-item" onclick="showToast('Đang tải Quyết định thành lập trung tâm')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định thành lập trung tâm</span><i class="fa-solid fa-download"></i></div>
                  <div class="grid-item" onclick="showToast('Đang tải Quyết định công nhận Giám đốc')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định công nhận Giám đốc</span><i class="fa-solid fa-download"></i></div>
                  <div class="grid-item" onclick="showToast('Đang tải Giấy chứng nhận đăng ký kinh doanh')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Giấy chứng nhận đăng ký kinh doanh</span><i class="fa-solid fa-download"></i></div>
                  <div class="grid-item" onclick="showToast('Đang tải Quyết định công khai pháp lý')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định công khai pháp lý</span><i class="fa-solid fa-download"></i></div>
              </div>
          `;
  } else if (type === "noidung") {
    detailsHTML = `
              <div class="grid-list" style="margin-top: 25px;">
                  <div class="grid-item" onclick="showToast('Đang tải Quyết định công khai nội dung và chương trình đào tạo')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định công khai nội dung và chương trình đào tạo</span><i class="fa-solid fa-download"></i></div>
                  <div class="grid-item" onclick="showToast('Đang xem Chương trình Tiếng Anh Mầm Non')"><span><i class="fa-solid fa-book" style="color: var(--accent); margin-right: 10px;"></i> Chương trình Tiếng Anh Mầm Non</span><i class="fa-solid fa-arrow-right"></i></div>
                  <div class="grid-item" onclick="showToast('Đang xem Chương trình Tiếng Anh Thiếu Nhi')"><span><i class="fa-solid fa-book" style="color: var(--accent); margin-right: 10px;"></i> Chương trình Tiếng Anh Thiếu Nhi</span><i class="fa-solid fa-arrow-right"></i></div>
                  <div class="grid-item" onclick="showToast('Đang xem Chương trình Tiếng Anh Thiếu Niên')"><span><i class="fa-solid fa-book" style="color: var(--accent); margin-right: 10px;"></i> Chương trình Tiếng Anh Thiếu Niên</span><i class="fa-solid fa-arrow-right"></i></div>
                </div>
          `;
  } else if (type === "giaovien") {
    detailsHTML = `
              <div class="grid-item" onclick="showToast('Đang tải Quyết định công khai giáo viên')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định công khai giáo viên</span><i class="fa-solid fa-download"></i></div>
              <div class="activities-grid" style="margin-top: 30px;">
                  <div class="activity-card" onclick="showToast('Thông tin chi tiết: Ông Nguyễn Văn Cảnh')">
                      <div class="activity-img-wrapper" style="height: 260px;">
                          <img src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/475136590_1617963932146262_749948951508482476_n.jpg?stp=dst-jpg_tt6&cstp=mx529x534&ctp=s529x534&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ianH1Oe8zBUQ7kNvwH2Ffye&_nc_oc=AdpT7mKx3F57WbvI1lG5wDrn1nYPB4m4gTEVGRdtKAUuSg3YK-oQ57mVmXcfVCEa-a3MKFIJ7YpHZBu9dlqnoqdA&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=hB498BAZR-Zn82fc6AuRIg&_nc_ss=7b2a8&oh=00_AQJUkUHB0DwPrfANknOaa9EtQA1P3ulcnrV2QYe_x7Lbcw&oe=6AB4414B" class="activity-img" alt="Giáo viên">
                      </div>
                      <div class="activity-content">
                          <h3>Ông Nguyễn Văn Cảnh</h3>
                          <p style="color: var(--accent); font-weight: 700; margin-bottom: 6px;">Giám đốc Trung tâm Ngoại ngữ Ha Teacher</p>
                          <p>Tốt nghiệp Đại học và Thạc sĩ trường Đại học Nha Trang</p>
                          <p>Chứng chỉ tiếng Anh  B, C, B1 - Chứng chỉ Tin học A, B</p>
                          <p>Trong quá trình công tác, Ông đã tích lũy nhiều kinh nghiệm trong công tác quản lý tại các cơ quan Nhà nước; đồng thời có nhiều năm kinh nghiệm giảng dạy tại Trường Đại học Phan Thiết, từ năm 2021 đến nay.</p>
                      </div>
                  </div>
                  <div class="activity-card" onclick="showToast('Thông tin chi tiết: Cô Nguyễn Thị Bích Hà')">
                      <div class="activity-img-wrapper" style="height: 260px;">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="Giáo viên">
                      </div>
                      <div class="activity-content">
                          <h3>Cô Nguyễn Thị Bích Hà</h3>
                          <p style="color: var(--accent); font-weight: 700; margin-bottom: 6px;"> Giám đốc đào tạo – Giáo viên chính</p>
                          <p>Là sinh viên xuất sắc của Trường Đại học Ngoại ngữ – Đại học Đà Nẵng.</p>
                          <p>Với hơn 10 năm kinh nghiệm giảng dạy tiếng Anh tại nhiều cơ sở giáo dục uy tín.</p>
                          <p>Trong quá trình công tác, giáo viên đã có kinh nghiệm giảng dạy tại THPT Nguyễn Duy Hiệu, hệ thống Trường Tiểu học – THCS – THPT Victoria và Trường Sky-Line tại Đà Nẵng, đồng thời tham gia bồi dưỡng và luyện thi học sinh giỏi.</p>
                      </div>
                  </div>
                  <div class="activity-card" onclick="showToast('Thông tin chi tiết: Cô Huỳnh Đỗ Thùy')">
                      <div class="activity-img-wrapper" style="height: 260px;">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="Giáo viên">
                      </div>
                      <div class="activity-content">
                          <h3>Cô Huỳnh Đỗ Thùy</h3>
                          <p style="color: var(--accent); font-weight: 700; margin-bottom: 6px;">Giáo viên chính</p>
                          <p>Là sinh viên giỏi của Trường Đại học Ngoại ngữ – Đại học Đà Nẵng.</p>
                          <p>với hơn 10 năm kinh nghiệm giảng dạy tiếng Anh tại nhiều cơ sở giáo dục uy tín.</p>
                          <p>Trong quá trình công tác, giáo viên đã có kinh nghiệm giảng dạy tại, hệ thống Trường Tiểu học – THCS – THPT Victoria và Trường Sky-Line tại Đà Nẵng, đồng thời tham gia bồi dưỡng và luyện thi học sinh giỏi.</p>
                      </div>
                  </div>
                  <div class="activity-card" onclick="showToast('Thông tin chi tiết: Cô Nguyễn Thị Thảo Vy')">
                      <div class="activity-img-wrapper" style="height: 260px;">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="Giáo viên">
                      </div>
                      <div class="activity-content">
                          <h3>Cô Nguyễn Thị Thảo Vy</h3>
                          <p style="color: var(--accent); font-weight: 700; margin-bottom: 6px;">Giáo viên thỉnh giảng</p>
                          <p>Là sinh viên giỏi của Trường Đại học Ngoại ngữ – Đại học Đà Nẵng.</p>
                          <p>Trong quá trình công tác, giáo viên đã có kinh nghiệm giảng dạy tại Trâm tâm Ngoại ngữ uy tín</p>
                      </div>
                  </div>
                  <div class="activity-card" onclick="showToast('Thông tin chi tiết: Cô Nguyễn Thị Diệu Hương')">
                      <div class="activity-img-wrapper" style="height: 260px;">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" class="activity-img" alt="Giáo viên">
                      </div>
                      <div class="activity-content">
                          <h3>Cô Nguyễn Thị Diệu Hương</h3>
                          <p style="color: var(--accent); font-weight: 700; margin-bottom: 6px;">Giáo viên chính</p>
                          <p>Là sinh viên xuất sắc của Trường Đại Đông Á</p>
                          <p>với hơn 10 năm kinh nghiệm giảng dạy tiếng Anh tại nhiều cơ sở giáo dục uy tín.</p>
                          <p>Trong quá trình công tác, giáo viên đã có kinh nghiệm giảng dạy tại, THCS Nguyễn Du, đồng thời tham gia bồi dưỡng và luyện thi học sinh giỏi.</p>
                      </div>
                  </div>
              </div>
          `;
  } else if (type === "hocphi") {
    detailsHTML = `
    <div class="grid-item" onclick="showToast('Đang tải Quyết định công khai học phí')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định công khai học phí</span><i class="fa-solid fa-download"></i></div>
              <div style="margin-top: 25px; overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; text-align: left; background: white; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-3d);">
                      <thead>
                          <tr style="background: var(--primary); color: white;">
                              <th style="padding: 16px 20px;">Khóa học</th>
                              <th style="padding: 16px 20px;">Thời lượng</th>
                              <th style="padding: 16px 20px;">Học phí niêm yết</th>
                              <th style="padding: 16px 20px;">Ưu đãi</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr style="border-bottom: 1px solid #e2e8f0;">
                              <td style="padding: 16px 20px; font-weight: 700;">Tiếng Anh Mầm Non</td>
                              <td style="padding: 16px 20px; color: var(--text-muted);">1 tháng (8 buổi)</td>
                              <td style="padding: 16px 20px; color: var(--accent); font-weight: 700;">50.000 VNĐ/1 buổi</td>
                              <td style="padding: 16px 20px;"><span style="background: #fee2e2; color: #ef4444; padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 13px;">Giảm theo chính sách</span></td>
                          </tr>
                          <tr style="border-bottom: 1px solid #e2e8f0;">
                              <td style="padding: 16px 20px; font-weight: 700;">Tiếng Anh Thiếu Nhi</td>
                              <td style="padding: 16px 20px; color: var(--text-muted);"> 1 tháng (8 buổi)</td>
                              <td style="padding: 16px 20px; color: var(--accent); font-weight: 700;">50.000 VNĐ/1 buổi</td>
                              <td style="padding: 16px 20px;"><span style="background: #eef2ff; color: var(--accent); padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 13px;">Giảm theo chính sách - Cam kết chất lượng</span></td>
                          </tr>
                          <tr>
                              <td style="padding: 16px 20px; font-weight: 700;">Luyện Thi Chứng Chỉ</td>
                              <td style="padding: 16px 20px; color: var(--text-muted);">3 tháng (36 buổi)</td>
                              <td style="padding: 16px 20px; color: var(--accent); font-weight: 700;">4.800.000 VNĐ</td>
                              <td style="padding: 16px 20px;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 13px;">Cam kết đầu ra</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          `;
  } else if (type === "chatluong") {
    detailsHTML = `
              <div class="grid-list" style="margin-top: 25px;">
                <div class="grid-item" onclick="showToast('Đang tải Quyết định công khai đảm bảo chất lượng')"><span><i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 10px;"></i> Quyết định công khai đảm bảo chất lượng</span><i class="fa-solid fa-download"></i></div>
                  <div class="grid-item" onclick="showToast('Đang xem Báo cáo kiểm định chất lượng đào tạo')"><span><i class="fa-solid fa-shield-halved" style="color: var(--secondary); margin-right: 10px;"></i> Báo cáo kiểm định chất lượng</span><i class="fa-solid fa-arrow-right"></i></div>
                  <div class="grid-item" onclick="showToast('Đang xem Quy chế cam kết đầu ra học viên')"><span><i class="fa-solid fa-circle-check" style="color: var(--secondary); margin-right: 10px;"></i> Quy chế cam kết đầu ra</span><i class="fa-solid fa-arrow-right"></i></div>
                  <div class="grid-item" onclick="showToast('Đang xem Khảo sát mức độ hài lòng phụ huynh')"><span><i class="fa-solid fa-face-smile" style="color: var(--secondary); margin-right: 10px;"></i> Khảo sát độ hài lòng học viên</span><i class="fa-solid fa-arrow-right"></i></div>
              </div>
          `;
  }

  contentArea.innerHTML = `
          <button class="back-btn" onclick="showPage('home')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
          <div class="card">
              <h2 class="section-title"><i class="fa-solid fa-file-shield"></i> ${titles[type]}</h2>
              <div style="font-size: 17px; line-height: 1.8; color: var(--text-muted); margin-bottom: 25px;">
                  ${descriptions[type]}
              </div>
              ${detailsHTML}
          </div>
      `;
}

// --- MENU TIẾNG ANH & CÁC LỚP ---
function showCourseSub(type) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateActiveNav("nav-courses");
  const contentArea = document.getElementById("content-area");
  let title = "";
  let items = [];

  if (type === "mamnon") {
    title = "Khóa học Mầm non";
    items = [
      "👋 Hello & Me – Chào hỏi & Giới thiệu bản thân",
      "👨‍👩‍👧 My Family – Gia đình của bé",
      "🎨 Colors & Shapes – Màu sắc & Hình dạng",
      "🔢 Numbers & Toys – Số đếm & Đồ chơi",
      "🐶 Animals – Thế giới động vật",
      "🍎 Food & Drinks – Đồ ăn & Thức uống",
      "🏫 My School – Trường học của bé",
      "🧸 My Body & Clothes – Cơ thể & Trang phục",
      "☀️ Weather & Nature – Thời tiết & Thiên nhiên",
      "🎉 Festivals & Fun – Lễ hội & Hoạt động vui chơi",
    ];
  } else if (type === "thieunhi") {
    title = "Tiếng Anh Tiểu học";
    items = ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"];
  } else if (type === "thieunien") {
    title = "Tiếng Anh THCS - THPT";
    items = ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"];
  } else if (type === "nguphap") {
    title = "Khóa học Ngữ pháp";
    items = [
      "Chủ đề 1: Danh từ",
      "Chủ đề 2: Tính từ sở hữu",
      "Chủ đề 3: a/ an",
      "Chủ đề 4: This/ That",
      "Chủ đề 5: There is/ There are",
      "Chủ đề 6: is/ am/ are",
      "Chủ đề 7: have/ has",
      "Chủ đề 8: V-s/es",
      "Chủ đề 9: V-ing",
      "Chủ đề 10:V-ed",
    ];
  } else if (type === "luyenthi") {
    title = "Khóa học Luyện thi";
    items = [
      "Luyện thi lớp 5-6",
      "Luyện thi 9-10",
      "Luyện thi chất lượng cao",
      "Luyện thi Đại học",
      "Luyện thi IOE lớp 3",
      "Luyện thi IOE lớp 4",
      "Luyện thi IOE lớp 5",
      "Luyện thi A1",
      "Luyện thi A2",
      "Luyện thi TOEIC",
      "Luyện thi TOEFL",
    ];
  }

  let html = `
          <button class="back-btn" onclick="showPage('home')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
          <div class="card">
              <h2 class="section-title"><i class="fa-solid fa-graduation-cap"></i> ${title}</h2>
              <p style="color: var(--text-muted); margin-bottom: 20px;">Vui lòng chọn mục bên dưới để tiếp tục:</p>
              <div class="grid-list">
      `;

  items.forEach((item) => {
    if (type === "mamnon") {
      if (item.includes("Hello & Me")) {
        html += `<div class="grid-item" onclick="window.open('lop1/canh.html', '_blank')"><span>${item}</span><i class="fa-solid fa-arrow-right"></i></div>`;
      } else if (item.includes("My Family")) {
        html += `<div class="grid-item" onclick="window.open('lop1/canh2.html', '_blank')"><span>${item}</span><i class="fa-solid fa-arrow-right"></i></div>`;
      } else {
        html += `<div class="grid-item" onclick="showToast('Đang mở nội dung: ${item}')"><span>${item}</span><i class="fa-solid fa-arrow-right"></i></div>`;
      }
    } else if (type === "thieunhi" || type === "thieunien") {
      html += `<div class="grid-item" onclick="renderClassUnits('${item}')"><span>${item}</span><i class="fa-solid fa-chevron-right"></i></div>`;
    } else if (type === "nguphap") {
      // GẮN LINK RIÊNG CHO PHẦN NGỮ PHÁP Ở ĐÂY
      if (item.includes("Present Simple")) {
        html += `<div class="grid-item" onclick="window.open('nguphap/unit1.html', '_blank')"><span>${item}</span><i class="fa-solid fa-arrow-right"></i></div>`;
      } else if (item.includes("Present Continuous")) {
        html += `<div class="grid-item" onclick="window.open('nguphap/unit2.html', '_blank')"><span>${item}</span><i class="fa-solid fa-arrow-right"></i></div>`;
      } else {
        html += `<div class="grid-item" onclick="showToast('Đang mở bài giảng: ${item}')"><span>${item}</span><i class="fa-solid fa-arrow-right"></i></div>`;
      }
    } else if (type === "luyenthi") {
      html += `<div class="grid-item" onclick="renderLuyenThiDe('${item}')"><span>${item}</span><i class="fa-solid fa-chevron-right"></i></div>`;
    }
  });

  html += `</div></div>`;
  contentArea.innerHTML = html;
}

function renderClassUnits(className) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const contentArea = document.getElementById("content-area");

  // 1. ĐỊNH NGHĨA TÊN TÙY CHỈNH CHO CÁC LỚP
  // Bạn có thể thêm bất kỳ lớp nào (ví dụ: "Lớp 1", "Lớp 2", ..., "Lớp 12") vào đây
  const syllabusData = {
    "Lớp 1": [
      "Unit 1: In the school playground",
      "Unit 2: In the dining room",
      "Unit 3: At the street market", // Tên hiển thị trên web
      "Unit 4: In the bedroom", // Tên hiển thị trên web
      "Review 1",
      "Unit 5: At the fish and chip shop",
      "Unit 6: In the classroom",
      "Unit 7: In the garden",
      "Unit 8: In the park",
      "Review 2",
      "Unit 9: In the shop",
      "Unit 10: At the zoo",
      "Unit 11: At the bus stop",
      "Unit 12: At the lake",
      "Review 3",
      "Unit 13: In the school canteen",
      "Unit 14: In the toy shop",
      "Unit 15: At the football match",
      "Unit 16: At home",
      "Review 4",
    ],
    "Lớp 2": [
      "Unit 1: At my birthday party",
      "Unit 2: In the backyard",
      "Unit 3: At the seaside", // Tên hiển thị trên web
      "Unit 4:  In the countryside", // Tên hiển thị trên web
      "Review 1",
      "Unit 5: In the classroom",
      "Unit 6: On the farm",
      "Unit 7: In the kitchen",
      "Unit 8: In the village",
      "Review 2",
      "Unit 9: In the grocery store",
      "Unit 10: At the zoo",
      "Unit 11: In the playground",
      "Unit 12: At the cafe",
      "Review 3",
      "Unit 13: In the maths class",
      "Unit 14: At home",
      "Unit 15: In the clothes shop",
      "Unit 16: At the campsite",
      "Review 4",
    ],
    "Lớp 3": [
      "Unit 1: Hello",
      "Unit 2: Our names",
      "Unit 3: Our friends",
      "Unit 4: My hobbies",
      "Unit 5: My hobbies",
      "Review 1 & Funtime",
      "Unit 6: Our school",
      "Unit 7: Classroom instructions",
      "Unit 8: My school things",
      "Unit 9: Colours",
      "Unit 10: Break time activities",
      "Review 2 & Funtime",
      "Unit 11: My family",
      "Unit 12: Jobs",
      "Unit 13: My house",
      "Unit 14: My bedroom",
      "Unit 15: At the dining table",
      "Review 3 & Funtime",
      "Unit 16: My pets",
      "Unit 17: Our toys",
      "Unit 18: Playing and doing",
      "Unit 19: Outdoor activities",
      "Unit 20: At the zoo",
      "Review 4 & Funtime",
    ],
    "Lớp 4": [
      "Unit 1: My Friends",
      "Unit 2: Time And Daily Routines",
      "Unit 3: My Week",
      "Unit 4: My Birthday Party",
      "Unit 5: Things We Can Do",
      "Review 1 & Funtime",
      "Unit 6: Our School Facilities",
      "Unit 7: Our Timetables",
      "Unit 8: My Favorite Subjects",
      "Unit 9: Our Sports Day",
      "Unit 10: Our Summer Holidayss",
      "Review 2 & Funtime",
      "Unit 11: My Home",
      "Unit 12: Jobs",
      "Unit 13: Appearance",
      "Unit 14: Daily activities",
      "Unit 15: My family's weekends",
      "Review 3 & Funtime",
      "Unit 16: Weather",
      "Unit 17: In the city",
      "Unit 18: At the shopping centre",
      "Unit 19: The animal world",
      "Unit 20: At summer camp",
      "Review 4 & Funtime",
    ],
    "Lớp 5": [
      "Unit 1: All about me!",
      "Unit 2: Our homes",
      "Unit 3: My foreign friends",
      "Unit 4: Our free-time activities",
      "Unit 5: My future job",
      "Review 1 & Funtime",
      "Unit 6: Our school rooms",
      "Unit 7: Our favourite school activities",
      "Unit 8: In our classroom",
      "Unit 9: Our outdoor activities",
      "Unit 10: Our school trip",
      "Review 2 & Funtime",
      "Unit 11: Family Time",
      "Unit 12: Our Tet holiday",
      "Unit 13: Our special days",
      "Unit 14: Staying healthy",
      "Unit 15: Our health",
      "Review 3 & Funtime",
      "Unit 16: Seasons and the weather",
      "Unit 17: Stories for children",
      "Unit 18: Means of transport",
      "Unit 19: Places of interest",
      "Unit 20: Our summer holidays",
      "Review 4 & Funtime",
    ],
    "Lớp 9": [
      "Unit 1: Hobbies",
      "Unit 2: Health",
      "Unit 3: Community Service",
      "Unit 4: Music and Arts",
      "Unit 5: Inventions",
      "Unit 6: Viet Nam Then and Now",
      "Unit 7: Recipes",
      "Unit 7.1: Recipes",
      "Unit 8 - trung tâm123", // Sẽ tự động mở trungtam.html khi bấm vào
      "Unit 9 - nguyenvancanh", // Sẽ tự động mở nguyenvancanh.html khi bấm vào
      "Unit 10: Space Travel",
    ],
    // Lưu ý: Nếu lớp nào không được khai báo ở trên (ví dụ Lớp 2, Lớp 3,...),
    // hệ thống sẽ tự động hiển thị tên mặc định là "Unit X - Tên Lớp".
  };

  let units = [];
  if (syllabusData[className]) {
    units = syllabusData[className];
  } else {
    for (let i = 1; i <= 10; i++) {
      units.push(`Unit ${i} - ${className}`);
    }
  }

  let html = `
          <button class="back-btn" onclick="showCourseSub('thieunhi')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
          <div class="card">
              <h2 class="section-title"><i class="fa-solid fa-book-open"></i> Danh sách bài học của ${className}</h2>
              <p style="color: var(--text-muted); margin-bottom: 20px;">Vui lòng chọn Unit để bắt đầu học:</p>
              <div class="grid-list">
      `;

  units.forEach((unitName) => {
    // 2. GẮN LINK RIÊNG DỰA VÀO TỪ KHÓA TRONG TÊN UNIT
    if (unitName.includes("nguyenvancanh")) {
      html += `<div class="grid-item" onclick="window.open('nguyenvancanh.html', '_blank')"><span>${unitName}</span><i class="fa-solid fa-arrow-right"></i></div>`;
    } else if (unitName.includes("trung tâm12")) {
      html += `<div class="grid-item" onclick="window.open('trungtam.html', '_blank')"><span>${unitName}</span><i class="fa-solid fa-arrow-right"></i></div>`;
    } else {
      html += `<div class="grid-item" onclick="showToast('Đang mở nội dung: ${unitName}')"><span>${unitName}</span><i class="fa-solid fa-arrow-right"></i></div>`;
    }
  });

  html += `</div></div>`;
  contentArea.innerHTML = html;
}

function renderLuyenThiDe(luyenThiName) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const contentArea = document.getElementById("content-area");

  // 1. ĐỊNH NGHĨA TÊN TÙY CHỈNH CHO CÁC KHÓA LUYỆN THI
  const examData = {
    "Luyện thi lớp 5-6": [
      "Đề số 1",
      "Đề số 2",
      "Đề số 3",
      "Đề số 4",
      "Đề số 5",
      "Đề số 6",
      "Đề số 7",
      "Đề số 8",
      "Đề số 9",
      "Đề số 10",
      "Đề số 11",
      "Đề số 12",
    ],
    "Luyện thi 2": [
      "Test 1: Listening",
      "Test 2: Reading",
      "Test 3 - nguyenvancanh",
    ],
    // Bạn có thể thêm các khóa luyện thi khác tương ứng vào đây...
  };

  let exams = [];
  if (examData[luyenThiName]) {
    exams = examData[luyenThiName];
  } else {
    // Nếu không khai báo trước, mặc định tạo ra 10 đề
    for (let i = 1; i <= 10; i++) {
      exams.push(`Đề ${i} - ${luyenThiName}`);
    }
  }

  let html = `
          <button class="back-btn" onclick="showCourseSub('luyenthi')"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
          <div class="card">
              <h2 class="section-title"><i class="fa-solid fa-file-lines"></i> Danh sách đề thi của ${luyenThiName}</h2>
              <p style="color: var(--text-muted); margin-bottom: 20px;">Vui lòng chọn đề thi để bắt đầu làm bài:</p>
              <div class="grid-list">
      `;

  exams.forEach((examName) => {
    // 2. GẮN LINK RIÊNG DỰA VÀO TỪ KHÓA TRONG TÊN ĐỀ THI
    if (examName.includes("nguyenvancanh")) {
      html += `<div class="grid-item" onclick="window.open('nguyenvancanh.html', '_blank')"><span>${examName}</span><i class="fa-solid fa-arrow-right"></i></div>`;
    } else if (
      examName.includes("trungtam123") ||
      examName.includes("trung tâm")
    ) {
      html += `<div class="grid-item" onclick="window.open('trungtam.html', '_blank')"><span>${examName}</span><i class="fa-solid fa-arrow-right"></i></div>`;
    } else {
      html += `<div class="grid-item" onclick="showToast('Đang mở: ${examName}')"><span>${examName}</span><i class="fa-solid fa-arrow-right"></i></div>`;
    }
  });

  html += `</div></div>`;
  contentArea.innerHTML = html;
}

// --- MENU TIN HỌC ---
function showInformaticsSub(type) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const contentArea = document.getElementById("content-area");

  // Bạn có thể hiển thị toàn bộ danh sách lớp tin học hoặc phân loại theo type nếu muốn
  contentArea.innerHTML = `
    <div class="card" style="padding: 30px; margin-bottom: 30px;">
      <h2 class="section-title" style="margin-bottom: 12px;"><i class="fa-solid fa-laptop-code"></i> Thông Tin Các Lớp Học Tin Học</h2>
      <p style="font-size: 16px; line-height: 1.6; color: var(--text-muted); margin-bottom: 0;">
        Các chương trình <strong>Làm quen máy tính, Kỹ năng sử dụng máy tính, Tin học đồ họa, AI & ChatGPT, Lập trình cơ bản</strong> được thiết kế theo lộ trình thực tế, giúp học viên làm chủ công nghệ từ nền tảng đến ứng dụng.
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
      <!-- Lớp 1: Làm quen máy tính -->
      <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
        <div style="width: 100%; height: 220px; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" alt="Làm quen máy tính" style="width: 100%; height: 120%; object-fit: cover;">
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Làm quen máy tính</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
            Giúp học viên mới bắt đầu làm quen với phần cứng, hệ điều hành, cách sử dụng chuột, bàn phím và thao tác cơ bản trên máy tính an toàn, hiệu quả.
          </p>
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tstinhtailoquen.html', '_blank')">Xem nội dung học <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!-- Lớp 2: Kỹ năng sử dụng máy tính -->
      <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
        <div style="width: 100%; height: 220px; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" alt="Kỹ năng sử dụng máy tính" style="width: 100%; height: 120%; object-fit: cover;">
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Kỹ năng sử dụng máy tính</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
            Thành thạo soạn thảo văn bản Word, bảng tính Excel, trình chiếu PowerPoint và các công cụ văn phòng thiết yếu phục vụ học tập và công việc.
          </p>
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tstinhkylang.html', '_blank')">Xem nội dung học <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!-- Lớp 3: Kỹ năng tin học và đồ họa -->
      <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
        <div style="width: 100%; height: 220px; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80" alt="Tin học và đồ họa" style="width: 100%; height: 120%; object-fit: cover;">
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Kỹ năng tin học và đồ họa</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
            Khám phá tư duy thiết kế hình ảnh, biên tập video và sử dụng các phần mềm đồ họa chuyên nghiệp phục vụ sáng tạo nội dung và truyền thông.
          </p>
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tstinhdohoa.html', '_blank')">Xem nội dung học <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!-- Lớp 4: ChatGPT & AI -->
      <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
        <div style="width: 100%; height: 220px; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80" alt="ChatGPT & AI" style="width: 100%; height: 120%; object-fit: cover;">
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Chat GPT - Ứng Dụng AI Vào Học Tập</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
            Hướng dẫn cách sử dụng trí tuệ nhân tạo (AI) và ChatGPT thông minh để hỗ trợ nghiên cứu, làm bài tập, dịch thuật và tối ưu hóa hiệu suất học tập.
          </p>
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tstinhchatgpt.html', '_blank')">Xem nội dung họcy <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
 <!-- Lớp 5: Lập trình Scratch -->
      <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
        <div style="width: 100%; height: 220px; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80" alt="ChatGPT & AI" style="width: 100%; height: 120%; object-fit: cover;">
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Lập trình Scratch</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
            Hướng dẫn cách sử dụng trí tuệ nhân tạo (AI) và ChatGPT thông minh để hỗ trợ nghiên cứu, làm bài tập, dịch thuật và tối ưu hóa hiệu suất học tập.
          </p>
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tstinhchatgpt.html', '_blank')">Xem nội dung họcy <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
      <!-- Lớp 5: Lập trình cơ bản (html, CSS, JavaScript, Python, C#) -->
      <div style="background: var(--card-bg); border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
        <div style="width: 100%; height: 220px; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Lập trình cơ bản" style="width: 100%; height: 120%; object-fit: cover;">
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">Lập trình cơ bản</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #4f46e5;">Khai giảng: Ngày 05 hàng tháng</p>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #4b5563; flex: 1;">
            Xây dựng tư duy logic, làm quen với ngôn ngữ lập trình nền tảng giúp học viên tự tay tạo ra các ứng dụng hoặc trò chơi đơn giản.
          </p>
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.open('tstinhlaptrinh.html', '_blank')">Xem nội dung học <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  `;
}

// Khởi chạy mặc định trang chủ khi load xong script
document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
});

// --- TRANG PHẢN HỒI Ý KIẾN (CHỈ HIỂN THỊ & PHÂN TRANG 5 MỤC/TRANG) ---
const feedbackList = [
  {
    datetime: "19/09/2026 - 19:30",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    content:
      "Phụ huynh em Học sinh lớp 6: Cho mình hỏi Trung tâm có lịch khai giảng lớp 6 chưa ạ. Bé Thư rất thích học với cô Hà",
    reply:
      "Trung tâm Ngoại ngữ Ha Teacher: Cảm ơn ý kiến đóng góp quý báu của anh/chị. Giáo viên chủ nhiệm sẽ gửi thêm file audio luyện tập riêng để hỗ trợ bé luyện phát âm tốt hơn ạ.",
  },
  {
    datetime: "18/09/2026 - 14:30",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    content:
      "Phụ huynh em Nguyễn Văn A (Lớp Mầm non): Cháu rất thích các buổi học ngoại khóa qua trải nghiệm tại trung tâm, nhờ thầy cô quan tâm nhắc nhở thêm phần phát âm của bé ở nhà.",
    reply:
      "Trung tâm Ngoại ngữ Ha Teacher: Cảm ơn ý kiến đóng góp quý báu của anh/chị. Giáo viên chủ nhiệm sẽ gửi thêm file audio luyện tập riêng để hỗ trợ bé luyện phát âm tốt hơn ạ.",
  },
];

let currentFeedbackPage = 1;
const itemsPerPage = 5;

function showFeedbackPage(page = 1) {
  currentFeedbackPage = page;
  updateActiveNav("nav-feedback");
  const contentArea = document.getElementById("content-area");

  const totalPages = Math.ceil(feedbackList.length / itemsPerPage) || 1;
  if (currentFeedbackPage > totalPages) currentFeedbackPage = totalPages;
  if (currentFeedbackPage < 1) currentFeedbackPage = 1;

  const startIdx = (currentFeedbackPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = feedbackList.slice(startIdx, endIdx);

  let html = `
    <div class="card">
      <h2 class="section-title"><i class="fa-solid fa-comments" style="color: var(--accent);"></i> Phản Hồi Ý Kiến Học viên - Phụ Huynh Học viên</h2>
      <p style="color: var(--text-muted); margin-bottom: 25px;">Ha Teacher luôn lắng nghe, tiếp nhận và trân trọng mọi ý kiến từ học viên và phụ huynh. Các góp ý được tổng hợp, xử lý và phản hồi minh bạch, rõ ràng, kịp thời. Mỗi ý kiến là cơ sở để Trung tâm không ngừng cải thiện chất lượng giảng dạy và dịch vụ.</p>
      <p style="color: var(--text-muted); margin-bottom: 25px;">Ha Teacher chân thành cảm ơn Quý phụ huynh đã tin tưởng và lựa chọn Trung tâm. Cảm ơn Ba Mẹ đã luôn đồng hành, chia sẻ và cùng Ha Teacher trên hành trình phát triển của các em. Lắng nghe – Phản hồi – Cải thiện – Đồng hành, vì một môi trường học tập ngày càng tốt hơn.</p>
      <div style="display: flex; flex-direction: column; gap: 20px;">
  `;

  if (currentItems.length === 0) {
    html += `<p style="text-align: center; color: var(--text-muted); padding: 20px;">Chưa có phản hồi nào.</p>`;
  } else {
    currentItems.forEach((item) => {
      html += `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 20px; display: grid; grid-template-columns: 200px 1fr; gap: 20px; align-items: start;">
          <div>
            <img src="${item.img}" alt="Hình ảnh phản hồi" style="width: 100%; height: 140px; object-fit: cover; border-radius: 10px; border: 1px solid #cbd5e1;" onerror="this.src='https://images.unsplash.com/photo-1584697964190-de5c09730bc9?auto=format&fit=crop&w=600&q=80'">
            <div style="font-size: 13px; color: var(--accent); font-weight: 600; margin-top: 8px; text-align: center;"><i class="fa-regular fa-clock"></i> ${item.datetime}</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: #ffffff; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
              <strong style="color: var(--primary); display: block; margin-bottom: 4px;"><i class="fa-solid fa-user-pen" style="color: var(--secondary);"></i> Nội dung phản hồi:</strong>
              <p style="color: var(--text-main); font-size: 15px; line-height: 1.5;">${item.content}</p>
            </div>
            <div style="background: #eff6ff; padding: 14px; border-radius: 10px; border: 1px solid #bfdbfe;">
              <strong style="color: #1d4ed8; display: block; margin-bottom: 4px;"><i class="fa-solid fa-reply"></i> Hồi đáp từ Trung tâm:</strong>
              <p style="color: #1e3a8a; font-size: 15px; line-height: 1.5;">${item.reply}</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  html += `
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <button onclick="showFeedbackPage(${currentFeedbackPage - 1})" ${currentFeedbackPage === 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : 'style="cursor: pointer;"'} style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600;">
          <i class="fa-solid fa-chevron-left"></i> Trang trước
        </button>
        
        <span style="font-weight: 600; color: var(--text-main);">Trang ${currentFeedbackPage} / ${totalPages}</span>

        <button onclick="showFeedbackPage(${currentFeedbackPage + 1})" ${currentFeedbackPage >= totalPages ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : 'style="cursor: pointer;"'} style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600;">
          Trang sau <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

    </div>
  `;
  contentArea.innerHTML = html;
}
