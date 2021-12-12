Validator({
  idForm: "#form",
  formGroupSelector: ".form-group",
  errorSelector: ".form-message",
  passwordSelector: "#password",
  passwordConfirmationSelector: "#password_confirmation",
  passwordName: "password",
  // selectOption_Name: "province",
  captchaRequired: "yes",
  rules: [
    Validator.isRequired("#fullname", "Họ và tên không được để trống"),
    Validator.isRequired("#email", "Email không được để trống"),
    Validator.isRequired("#phone_number", "Số điện thoại không được để trống"),
    Validator.isRequired("#password", "Mật khẩu không được để trống"),
    Validator.isRequired("#password_confirmation", "Vui lòng xác nhận lại mật khẩu"),
    //   Validator.isRequired("#province"),
    // Validator.isRequired("input[name='gender']"),
    // Validator.isRequired("#avatar"),
    Validator.isName("#fullname", "Vui lòng nhập lại họ và tên hợp lệ"),
    Validator.isEmail("#email", "Vui lòng nhập lại email hợp lệ"),
    Validator.isPhoneNumber("#phone_number", "Vui lòng nhập lại số điện thoại hợp lệ "),
    // Validator.isAddress("#address"),
    Validator.isMinLength("#password", 6, "Vui lòng nhập lại mật khẩu độ dài trên 6 ký tự"),
    Validator.isConfirmPassword(
      "#password_confirmation",
      () => {
        return document.querySelector("#form #password").value
      },
      "Vui lòng nhập lại mật khẩu trùng khớp"
    ),
  ],
  captchaErrorMessage: "Vui lòng nhập captcha",
  onSubmit: function (data) {
    // Post method to API server
    var api = "https://unicadb.herokuapp.com/users"
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    fetch(api, options)
      .then((response) => response.json())
      .then(() => {
        alert("Tài khoản của bạn đã được tạo thành công, sẽ được chuyển sang trang đăng nhập trong 3 giây")
        setTimeout(() => {
          window.location = "../login"
        }, 3000)
      })
      .catch(() => alert("Có lỗi xảy ra khi gửi dữ liệu lên server, vui lòng kiểm tra kết nối mạng và thử lại"))
  },
})
