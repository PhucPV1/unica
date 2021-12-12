$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)

function renderLogin() {
  var userDataLogin = JSON.parse(localStorage.getItem("userDataStorage"))
  var loginSuccessElement = $("#login-success")
  var loginBtn = $("#login")
  var signupBtn = $("#signup")
  var usernameElement = $("#username")
  var profileImg = $(".profile-img")
  var profileMenu = $(".profile-menu")
  var logoutBtn = $("#logout")
  loginSuccessElement.style.display = "flex"
  loginBtn.style.display = "none"
  signupBtn.style.display = "none"
  usernameElement.innerText = userDataLogin.full_name
  profileImg.onclick = () => {
    profileMenu.classList.toggle("active")
  }
  logoutBtn.onclick = (e) => {
    e.preventDefault()
    localStorage.removeItem("userDataStorage")
    loginSuccessElement.style.display = "none"
    loginBtn.style.display = "flex"
    signupBtn.style.display = "flex"
  }
}
/* Render user login navbar when having key in localStorage */
if ("userDataStorage" in localStorage) {
  renderLogin()
}
/* Auto render course every accessing homepage */
;(function renderCourses() {
  api = "https://unicadb.herokuapp.com/courses"
  fetch(api)
    .then((response) => response.json())
    .then((courses) => {
      var bestSalesCoursesElement = $(".best_sales_render_courses")
      courses.map((course) => {
        var discountPercent = Math.ceil(100 - (course.present_price / course.previous_price) * 100)
        var previousPrice = course.previous_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        var presentPrice = course.present_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        var courseElement = `<div class="grid_items">
          <a href="#">
            <span class="sale-off"> -${discountPercent}%</span>
            <img src="${course.img_src}" alt="" />
            <div class="course_content">
              <h3 class="course_title">${course.title}</p></h3>
              <div class="teacher_and_prevPrice">
                <span class="teacher_name">${course.teacher}</span>
                <span class="previous_price">${previousPrice}<sup>đ</sup></span>
              </div>
              <div class="stars_and_presentPrice">
                <span class="star_rate">
                  <i class="fa fa-star co-or" aria-hidden="true"></i>
                  <i class="fa fa-star co-or" aria-hidden="true"></i>
                  <i class="fa fa-star co-or" aria-hidden="true"></i>
                  <i class="fa fa-star co-or" aria-hidden="true"></i>
                  <i class="fa fa-star co-or" aria-hidden="true"></i>
                  (${course.review_count})
                </span>
                <span class="present_price">${presentPrice}<sup>đ</sup></span>
              </div>
            </div>
          </a>
        </div>`
        bestSalesCoursesElement.insertAdjacentHTML("beforeend", courseElement)

        /* Layout CSS setting for courses render */
        columnLayoutCount = Math.ceil(bestSalesCoursesElement.childElementCount / 2)
        bestSalesCoursesElement.classList.add("render")
        bestSalesCoursesElement.style.gridTemplateColumns = `repeat(${columnLayoutCount}, minmax(250px, 1fr)
        )`

        /* Drag to scroll */
        let isDown = false
        let startX
        let scrollLeft
        bestSalesCoursesElement.addEventListener("mousedown", (e) => {
          isDown = true
          bestSalesCoursesElement.classList.add("grab")
          startX = e.pageX - bestSalesCoursesElement.offsetLeft
          scrollLeft = bestSalesCoursesElement.scrollLeft
        })
        bestSalesCoursesElement.addEventListener("mouseleave", () => {
          isDown = false
          bestSalesCoursesElement.classList.remove("grab")
        })
        bestSalesCoursesElement.addEventListener("mouseup", () => {
          isDown = false
          bestSalesCoursesElement.classList.remove("grab")
        })
        bestSalesCoursesElement.addEventListener("mousemove", (e) => {
          if (!isDown) return
          e.preventDefault()
          const x = e.pageX - bestSalesCoursesElement.offsetLeft
          const walk = (x - startX) * 1 //scroll-speed
          bestSalesCoursesElement.scrollLeft = scrollLeft - walk
        })
      })
    })
    .catch(() => {
      alert("Gặp lỗi khi nhận dữ liệu từ server, vui lòng kiểm tra kết nối mạng")
    })
})()
/* Show menu on mobile scr */
let menuMobileBtn = $(".menu_tablet")
menuMobileBtn.onclick = () => {
  let menu_tablet_content = $(".menu_tablet_content")
  menu_tablet_content.classList.toggle("active")
  menu_tablet_content.style.animation = "slide-menu-mobile linear 0.2s"
  let arrowBtn = $(".menu_mobile_arrow-left")
  arrowBtn.onclick = (e) => {
    e.stopPropagation()
    menu_tablet_content.classList.toggle("active")
  }
  menuMobileBtn.onclick = () => {
    menu_tablet_content.classList.toggle("active")
  }
}
