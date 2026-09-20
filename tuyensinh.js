// --- XỬ LÝ FORM ĐĂNG KÝ TUYỂN SINH MẦM NON ---
function openRegistrationForm() {
  document.getElementById("registration-modal").style.display = "flex";
}

function closeRegistrationForm() {
  document.getElementById("registration-modal").style.display = "none";
}

function submitRegistration(event) {
  event.preventDefault();

  const formData = {
    studentName: document.getElementById("studentName").value,
    parentName: document.getElementById("parentName").value,
    currentClass: document.getElementById("currentClass").value,
    address: document.getElementById("address").value,
    course: document.getElementById("course").value,
    note: document.getElementById("note").value
  };

  // Thay thế đường dẫn bên dưới bằng URL Web App bạn nhận được sau khi Deploy Google Apps Script
  const scriptURL = "THAY_THE_LINK_WEB_APP_GOOGLE_SCRIPT_CUA_BAN_VAO_DAY";

  showToast("Đang gửi thông tin đăng ký...");

  // Nếu chưa cấu hình link Google Script, hệ thống sẽ tạm hiển thị thông báo thành công
  if (scriptURL.includes("THAY_THE_LINK")) {
    setTimeout(() => {
      showToast("Đăng ký thành công! Trung tâm sẽ liên hệ với bạn sớm nhất.");
      document.getElementById("admission-form").reset();
      closeRegistrationForm();
    }, 1000);
    return;
  }

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(() => {
    showToast("Đăng ký thành công! Dữ liệu đã được gửi về hệ thống.");
    document.getElementById("admission-form").reset();
    closeRegistrationForm();
  })
  .catch(error => {
    console.error("Lỗi:", error);
    showToast("Có lỗi xảy ra, vui lòng thử lại sau.");
  });
}