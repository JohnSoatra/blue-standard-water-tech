let deleteId = "";
let isUsed = false;
const limit = 15;
let lastTime = undefined;
let firstTime;
let isFinished = true;
async function qsWork(qs) {
  let lister = 0;
  let index = 0;
  let lastIndex = qs.size - 1;
  qs.forEach(doc => {
    const id = doc.id;
    const name = doc.data().name;
    const container = $(".item-container");
    const itemWrapper = document.createElement("div");
    itemWrapper.id = id;
    itemWrapper.className = "item-wrapper";
    if (lister < limit) {
      lister ++;
      ref.child(`${stName}${id}`).list({maxResults: 1}).then(list =>
        list.items.map(item => {
          item.getDownloadURL()
          .then(url => {
            itemWrapper.innerHTML = `
              <span class="item-name">${name}</span>
              <img src="${url}" alt="at-car" class="item-img" onclick="handleVisit('${id}')">
              <div class="options">
                <i class="material-icons iconEdit" onclick="handleEdit('${id}')">edit</i>
                <i class="material-icons iconDelete" onclick="handleDelete('${name}', '${id}')">delete</i>
              </div>
            `;
            container.append(itemWrapper);
            if (index === lastIndex) {
              $(".more").addClass("more-disable");
              $(".more-disable").removeClass("more");
              $(".more-disable").attr("title", "អស់ទំនិញហើយ");
              $(".more-disable").off("click");
              if (!isUsed) {
                $(".more-wrapper").css("display", "block");
                $(".hole-screen-white").css("display", "none");
                isUsed = true;
              }
              lastTime = parseInt(doc.data().time);
              $(".proSmall").css("display", "none");
              $(".iconMore").css("display", "unset");
              isFinished = true;
            }
            index ++;
          })
          .then(() => {
            if (lister === limit && qs.size > limit) {
              if (!isUsed) {
                $(".more-wrapper").css("display", "block");
                $(".hole-screen-white").css("display", "none");
                isUsed = true;
              }
              $(".proSmall").css("display", "none");
              $(".iconMore").css("display", "unset");
              isFinished = true;
            }
          })
        })
      )
    } else {
      lastTime = parseInt(doc.data().time);
    }
  });
}
async function getData() {
  if (!lastTime) {
      await db.collection(dbName).orderBy("time", "desc").limit(limit + 1).get().then(qs => qsWork(qs));
  } else {
    await db.collection(dbName).orderBy("time", "desc").where("time", "<=", lastTime).limit(limit + 1).get().then(qs => qsWork(qs));
  }
}
getData();
$(".more").on("click", () => {
  if (isFinished) {
    isFinished = false;
    $(".proSmall").css("display", "unset");
    $(".iconMore").css("display", "none");
    getData();
  }
});
function handleEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}
function handleDelete(name, id) {
  deleteId = id;
  if (name.length > 15) {
    $(".modal-item-name").text(`(${name.slice(0, 15)}...)`);
  } else {
    $(".modal-item-name").text(`(${name})`);
  }
  $(".modal-wrapper, .hole-screen").fadeIn("fast");
}
function handleVisit(id) {
  window.location.href = `item.html?id=${id}`;
}
$(".add-btn").on("click", () => {
  window.location.href = "add.html";
});
$(".action-no, .action-yes").on("click", () => {
  $(".modal-wrapper, .hole-screen").fadeOut("fast");
});
$(".action-yes").on("click", async () => {
  await db.collection(dbName).doc(deleteId).delete().then(() =>
    ref.child(`${stName}${deleteId}`).listAll().then(list =>
      list.items.map((item, index) =>
        ref.child(`${stName}${deleteId}/${item.name}`).delete().then(() => {
          if (index === list.items.length - 1) {
            const container = document.getElementsByClassName("item-container")[0];
            const children = container.children;
            for (let i = 0; i < children.length; i ++) {
              const child = children.item(i);
              if (child.id === deleteId) {
                container.removeChild(child);
                break;
              }
            }
            $(".result-wrapper").fadeIn("fast");
            setTimeout(() => $(".result-wrapper").fadeOut("slow"), 3500);
          }
        })
      )
    )
  );
});