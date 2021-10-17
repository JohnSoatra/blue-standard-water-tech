const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let currentImage = 1;
let imgAmount = 0;

async function getData() {
  await db.collection(dbName).doc(id).get().then(async item => {
    if (item.exists) {
      const data = item.data();
      $(".name").text(data.name);
      $(".price").text(data.price + "$");
      $(".desc").text(data.description);
      await ref.child(`${stName}${id}`).listAll().then(list => {
        list.items.forEach(async item =>
          await item.getDownloadURL().then(url => {
            $(".img-wrapper").append(`
              <div class="img-item">
                <img src="${url}" alt="img" class="img" onclick="viewImage('${url}')">
              </div>
            `);
          })
        );
        imgAmount = list.items.length;
        if (imgAmount === 1) {
          $(".slider").css("display", "none");
        }
        $(".counter").text(`${currentImage}/${imgAmount}`);
      });
    }
  });
}
getData();

$(".iconLeft").on("click", function(event) {
  document.querySelector(".img-wrapper").scrollBy({
    left: -$(".img-wrapper").width(),
    behavior: "smooth",
  });
  if (currentImage > 1) {
    currentImage --;
    $(".counter").text(`${currentImage}/${imgAmount}`);
  }
});
$(".iconRight").on("click", () => {
  document.querySelector(".img-wrapper").scrollBy({
    left: $(".img-wrapper").width(),
    behavior: "smooth",
  });
  if (currentImage < imgAmount) {
    currentImage ++;
    $(".counter").text(`${currentImage}/${imgAmount}`);
  }
});
function viewImage(src) {
  $(".img-show").attr("src", src);
  $(".img-show, .hole-screen").fadeIn(250);
}
$(".hole-screen, .img-show").on("click", () => {
  $(".img-show, .hole-screen").fadeOut("fast");
});
$(".back-wrapper").on("click", () => {
  window.history.go(-1);
});