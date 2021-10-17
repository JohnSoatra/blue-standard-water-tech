let deleteId = "";
async function getData() {
  await db.collection(dbName).get().then(qs => {
    qs.forEach(doc => {
      const id = doc.id;
      const name = doc.data().name;
      const container = $(".item-container");
      const itemWrapper = document.createElement("div");
      itemWrapper.id = id;
      itemWrapper.className = "item-wrapper";
      ref.child(`${stName}${id}`).list({maxResults: 1}).then(list =>
        list.items.forEach(item => {
          item.getDownloadURL().then(url => {
            itemWrapper.innerHTML = `
              <span class="item-name">${name}</span>
              <img src="${url}" alt="at-car" class="item-img" onclick="handleVisit('${id}')">
              <div class="options">
                <i class="material-icons iconEdit" onclick="handleEdit('${id}')">edit</i>
                <i class="material-icons iconDelete" onclick="handleDelete('${name}', '${id}')">delete</i>
              </div>
            `;
            container.append(itemWrapper);
          })
        })
      );
    });
  });
}
getData();
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
      list.items.forEach(item =>
        ref.child(`${stName}${deleteId}/${item.name}`).delete()
      )
    ).then(() => {
      const container = document.getElementsByClassName("item-container")[0];
      const children = container.children;
      for (let i = 0; i < children.length; i ++) {
        const child = children.item(i);
        if (child.id === deleteId) {
          container.removeChild(child);
          break;
        }
      }
    })
  );
});