const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getData() {
  const fs = [];
  await db.collection("items").doc(id).get().then(async item => {
    if (item.exists) {
      const data = item.data();
      document.querySelector("input[name='name']").value = data.name;
      document.querySelector("input[name='price']").value = data.price;
      document.querySelector("textarea[name='desc']").value = data.description;
      await ref.child(id).listAll().then(list =>
        list.items.forEach(async item => 
          await item.getDownloadURL().then(async url =>
            // await fetch(url, {mode: "cors"}).then(async res =>
            //   await res.blob().then(b => {
            //     fs.push(new File([b], item.name, {type: b.type}));
            //     console.log(url);
            //   }
            //   )
            // )
            {
              const xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.open("get", url);
              xhr.send();
              xhr.onload = () => {
                console.log("success");
              }
              xhr.onerror = () => {
                console.log("error");
              }
            }
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
  await db.collection("items").doc(id).update({name, price, description}).then(async data =>
    await ref.child(data.id).listAll().then(list =>
      list.items.forEach(async item =>
        await item.delele()
      )
    ).then(() =>
        files.map(async (file) =>
          await ref.child(`${data.id}/${file.name}`).put(file)
        )
    )
  );
});