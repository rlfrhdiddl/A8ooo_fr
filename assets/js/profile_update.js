window.onload = async function() {

  const payload = localStorage.getItem("payload");
  const parsedPayload = JSON.parse(payload);
  const userId = parsedPayload.user_id
 
  const response = await fetch(`${backend_base_url}/users/${userId}`, {
    headers: {
      Authorization: "Bearer" + localStorage.getItem("access"),
    },
    method: "GET",
  });
  const data = await response.json();

  console.log(data)

  const beforeUserEmail = document.getElementById("email")
  const beforeUsername = document.getElementById("username")
  const beforeAboutMe = document.getElementById("aboutme")

  //
  const avatarBox = document.getElementById("imgthumbnail2")
  const beforeImg = document.createElement("img")
  beforeImg.setAttribute("id", "beforeImg")
  avatarBox.appendChild(beforeImg)

  const beforeAvatar = document.getElementById("beforeImg");
  beforeAvatar.style.width = "200px"
  beforeAvatar.style.marginLeft = "150px"
  beforeAvatar.style.borderRadius = "50%"
  beforeAvatar.setAttribute("src",`${backend_base_url}/${data.photo}`)
  console.log(beforeAvatar)

  beforeUsername.innerText = data.username
  beforeUserEmail.innerText = data.email
  beforeAboutMe.innerText = data.about_me




}
//프로필 수정하기
async function putProfile(user_id) {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  user_id = payload_parse.user_id;
  console.log(user_id);

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const aboutMe = document.getElementById("aboutme").value;
  const token = localStorage.getItem("access");

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("about_me", aboutMe);

  const imageInput = document.getElementById("photo");
  const photo = imageInput.files[0]; // 파일 업로드 input에서 선택한 파일 가져오기
  console.log(imageInput)
  console.log(photo)

  if (photo) {
    formData.append("photo", photo);
  }

  const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  if (response.status == 200) {
    alert("프로필 수정 완료");
    window.location.href = "profile.html";
  } else if (username == "" || aboutMe == "" || email == "") {
    alert("빈칸을 입력해 주세요.");
  } else if (response.status == 400) {
    alert("이메일 양식에 맞게 작성해주세요.");
  } else {
    console.error("요청 실패:", response);
  }
}

// 이미지 업로드 미리보기
function setThumbnail(event) {
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = document.createElement("img");
    img.setAttribute("src", event.target.result);

    // 썸네일 크기 조절
    img.style.width = "200px";
    img.style.marginLeft = "150px";
    img.style.borderRadius = "50%";
    img.style.borderStyle = "solid";

    // 이미지 미리보기 영역
    let imgThumbnail = document.querySelector("#imgthumbnail2");

    // 기존 이미지가 있으면 제거
    while (imgThumbnail.firstChild) {
      imgThumbnail.removeChild(imgThumbnail.firstChild);
    }

    // 새 이미지를 미리보기 영역에 추가
    imgThumbnail.appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
}

function profileNoUpdate() {
  window.location.href = "profile.html";
}
