const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function appendUrl(url, name) {
  $("#img-container").append(`
    <div class="img-wrapper" data-index="${preFiles.length}">
      <img src='${url}' alt='image' class="img"/>
      <i class="material-icons-outlined delete1" onclick="handleDelete(this)"​ title="ដករូបនេះចេញ">close</i>
    </div>
  `);
  preFiles.push(name);
}
async function addFile(url, isAll) {
  let name = url.split("/");
  name = name[name.length - 1];
  await fetch(url).then(res => {
    res.blob().then(blob => {
      files.push(new File([blob], name));
      if (isAll) {
        $("button[type='submit']").css({
          display: "flex"
        });
        $(".delete1, .iconDeleteAll").css({
          display: "unset"
        });
      }
    });
  });
}
async function getData() {
  await db.collection(dbName).doc(id).get().then(item => {
    if (item.exists) {
      const data = item.data();
      preName = data.name;
      prePrice = data.price;
      preDescription = data.description;
      document.querySelector("input[name='name']").value = preName;
      document.querySelector("input[name='price']").value = prePrice;
      document.querySelector("textarea[name='desc']").value = preDescription;
      ref.child(`${stName}${id}`).listAll().then(list =>
        list.items.map((item, index) =>
          item.getDownloadURL().then(url => {
            appendUrl(url, item.name);
            addFile(`https://apis.blue-standard-water-tech.com/${stName}${id}/${item.name}`, index === list.items.length - 1);
          })
        )
      );
    }
  });
}
getData();
async function imageUploader(cb) {
  await ref.child(`${stName}${id}`).listAll().then(list =>
    list.items.forEach(item => {
      let deleted = true;
      for (let file of files) {
        if (file.name === item.name) {
          deleted = false;
          break;
        }
      }
      if (deleted) {
        ref.child(`${stName}${id}/${item.name}`).delete().then(() => console.log("deleted"));
      }
    })
  )
  .then(() =>
    files.forEach(file => {
      let uploaded = true;
      for (let name of preFiles) {
        if (file.name === name) {
          uploaded = false;
          break;
        }
      }
      if (uploaded) {
        ref.child(`${stName}${id}/${file.name}`).put(file).then(() => console.log("puted"));
      }
    })
  ).then(cb);
}
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
  const updateObject = {};
  $(".hole-screen").css({
    display: "block"
  });
  $(".loading").css({
    display: "flex"
  });
  if (name !== preName) updateObject["name"] = name;
  if (price !== prePrice) updateObject["price"] = price;
  if (preDescription) updateObject["description"] = description;
  const cb = () => {
    preName = name;
    prePrice = price;
    preDescription = description;
    preFiles.splice(0);
    files.forEach(file => preFiles.push(file.name));
    $(".hole-screen, .loading").css({
      display: "none"
    });
  }
  if (Object.keys(updateObject).length > 0) {
    await db.collection(dbName).doc(id).update(updateObject).then(() =>
      imageUploader(cb)
    ); 
  } else {
    imageUploader(cb);
  }
});