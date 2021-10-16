const params = new URLSearchParams(window.location.search);
const deleteId = params.get("id");

async function getData() {
  await db.collection("items").doc(deleteId).get().then(async item => {
    if (item.exists) {
      const data = item.data();
      document.querySelector("input[name='name']").value = data.name;
      document.querySelector("input[name='price']").value = data.price;
      document.querySelector("textarea[name='desc']").value = data.description;
      await ref.child(deleteId).listAll().then(list =>
        list.items.forEach(async item =>
          await fetch(`https://apis.blue-standard-water-tech.com/${deleteId}/${item.name}`).then(async res =>
            await res.blob().then(blob => {
              appendImage([new File([blob], item.name)]);
            })
          )
        )
      );
    }
  });
}
getData();

$("form.editForm").on("submit", async event => {
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
  price = parseFloat(price);
  await db.collection("items").doc(deleteId).update({name, price, description}).then(() =>
    ref.child(deleteId).listAll().then(list =>
      list.items.forEach(item =>{
        ref.child(`${deleteId}/${item.name}`).delete().then(() => console.log("delete"))
      })
    ).then(() =>
        files.map(file =>
          {
            ref.child(`${deleteId}/${file.name}`).put(file).then(() => console.log("upload"));
          }
        )
      )
  );
});