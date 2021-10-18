const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let currentImage = 0;
let imgAmount = 0;

async function getData() {
  await db.collection(dbName).doc(id).get().then(async item => {
    if (item.exists) {
      const data = item.data();
      $(".name").text(data.name);
      $(".price").text(data.price + "$");
      $(".desc").text(data.description);
      await ref.child(`${stName}${id}`).listAll().then(list => {
        list.items.map(async (item, index) =>
          await item.getDownloadURL().then(url => {
            $(".img-wrapper").append(`
              <div class="img-item">
                <img src="${url}" alt="img" class="img" onclick="viewImage(${index})">
              </div>
            `);
            $(".showed-image-container").append(`
              <img src="${url}" alt="showed-image" class="img-show" data-index="${index}" onclick='handleHide(${index})'">
            `);
          })
        );
        imgAmount = list.items.length;
        if (imgAmount === 1) {
          $(".slider").css("display", "none");
        }
        $(".counter").text(`${currentImage + 1}/${imgAmount}`);
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
  if (currentImage > 0) {
    currentImage --;
    $(".counter").text(`${currentImage + 1}/${imgAmount}`);
  }
});
$(".iconRight").on("click", () => {
  document.querySelector(".img-wrapper").scrollBy({
    left: $(".img-wrapper").width(),
    behavior: "smooth",
  });
  if (currentImage < imgAmount - 1) {
    currentImage ++;
    $(".counter").text(`${currentImage + 1}/${imgAmount}`);
  }
});
function viewImage(index) {
  $(`.img-show[data-index='${index}'], .hole-screen`).fadeIn(250);
}
function handleHide(index) {
  console.log(index);
  $(`.img-show[data-index='${index}'], .hole-screen`).fadeOut("fast");
}
$(".hole-screen").on("click", () => handleHide(currentImage));
$(".back-wrapper").on("click", () => {
  window.history.go(-1);
});