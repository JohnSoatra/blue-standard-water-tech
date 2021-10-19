let preName;
let prePrice;
let preDescription;
const preFiles = [];
const files = [];
$("form.addForm").on("submit", async event => {
  event.preventDefault();
  const name = $("input[name='name']").val();
  let price = $("input[name='price']").val();
  const description = $("textarea[name='desc']").val();
  if (name === "") {
    $("input[name='name']").addClass("input-error");
    $("input[name='name']").siblings("i").css("color", "rgb(255 63 63)");
    $("input[name='name']").parent().css("borderColor", "rgb(255 58 58 / 50%)");
    return;
  }
  if (price === "") {
    $("input[name='price']").addClass("input-error");
    $("input[name='price']").siblings("i").css("color", "rgb(255 63 63)");
    $("input[name='price']").parent().css("borderColor", "rgb(255 58 58 / 50%)");
    return;
  }
  if (description === "") {
    $("textarea[name='desc']").addClass("input-error");
    $("textarea[name='desc']").siblings("i").css("color", "rgb(255 63 63)");
    $("textarea[name='desc']").parent().css("borderColor", "rgb(255 58 58 / 50%)");
    return;
  }
  if (files.length === 0) {
    $(".wanning").fadeIn("slow");
    setTimeout(() => $(".wanning").fadeOut("slow"), 2500);
    return;
  }
  $(".hole-screen").css({
    display: "block"
  });
  $(".loading").css({
    display: "flex"
  });
  price = parseFloat(price);
  await db.collection(dbName).add({name, price, description}).then(data => 
    files.map((file, index) => {
      ref.child(`${stName}${data.id}/${file.name}`).put(file).then(() => {
        if (index === files.length - 1) {
          $(".hole-screen, .loading").css({
            display: "none"
          });
          document.querySelector("input[name='name']").value = "";
          document.querySelector("input[name='price']").value = "";
          document.querySelector("textarea[name='desc']").value = "";
          $("i.iconDeleteAll").trigger("click");
          $(".result-wrapper").fadeIn("fast");
          setTimeout(() => $(".result-wrapper").fadeOut("slow"), 3500);
        }
      });
    })
  ).then(() => console.log("success"));
});
$("input, textarea").on("focus", function(event) {
  this.parentElement.style.borderColor = "rgba(28, 78, 170, 0.5)";
  this.parentElement.children[0].style.color = "rgb(28, 78, 170)";
  if (this.classList.contains("input-error")) {
    $(this).removeClass("input-error");
  }
});
$("input, textarea").on("blur", function(event) {
  this.parentElement.style.borderColor = "#bbb";
  this.parentElement.children[0].style.color = "#bbb";
});
$("textarea[name='desc']").on("keyup", function(event) {
  const rows = this.value.split("\n").length;
  if (this.getAttribute("rows") != rows + 1) {
    this.setAttribute("rows", (rows + 1).toString());
  }
});
$("#fileBtn").on("click", function(event) {
  $("input[name='file']").trigger("click");
});
$("i.iconDeleteAll").on("click", function() {
  files.splice(0);
  $("div#img-container").children().remove();
  this.style.display = "none";
});
$("input[name='file']").on("change", function(event) {
  if (this.files) {
    appendFiles(this.files);
    if ($("i.iconDeleteAll").css("display") !== "unset") {
      $("i.iconDeleteAll").css("display", "unset");
    }
    this.value = "";
  }
});
function handleDelete(element) {
  const index = parseInt(element.parentElement.getAttribute("data-index"));
  $("#img-container").children().remove(`div[data-index="${index}"]`);
  files.splice(index, 1);
  $.map($("#img-container").children(), function(c, i) {
    c.setAttribute("data-index", i.toString());
  });
  if (files.length === 0) {
    $("i.iconDeleteAll").css("display", "none");
  }
}
function appendFile(file) {
  $("#img-container").append(`
    <div class="img-wrapper" data-index="${files.length}">
      <img src='${URL.createObjectURL(file)}' alt='image' class="img"/>
      <i class="material-icons-outlined" onclick="handleDelete(this)"​ title="ដករូបនេះចេញ">close</i>
    </div>
  `);
  files.push(file);
}
function appendFiles(fs) {
  for (let i = 0; i < fs.length; i ++) {
    appendFile(fs[i]);
  }
}
$(".back-wrapper").on("click", () => {
  window.history.go(-1);
});