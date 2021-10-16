// database
db.collection("items").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(async change => {
    if (change.type === "added") {
      const id = change.doc.id;
      const name = change.doc.data().name;
      const container = $(".item-container");
      const itemWrapper = document.createElement("div");
      itemWrapper.id = id;
      itemWrapper.className = "item-wrapper";
      await ref.child(id).list({maxResults: 1}).then(list =>
        list.items.forEach(async item =>
          await item.getDownloadURL().then(url => {
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
        )
      );
    } else if (change.type === "removed") {
      const id = change.doc.id;
      const container = document.getElementsByClassName("item-container")[0];
      const children = container.children;
      for (let i = 0; i < children.length; i ++) {
        const child = children.item(i);
        if (child.id === id) {
          container.removeChild(child);
          break;
        }
      }
    }
  });
});
// logic
let deleteId = "";
$(".add-btn").on("click", function(event) {
  window.location.href = "add.html";
});
$(".action-no, .action-yes").on("click", function(event) {
  $(".modal-wrapper, .hole-screen").fadeOut("fast");
});
$(".action-yes").on("click", async () => {
  await db.collection("items").doc(deleteId).delete().then(async () =>
    // await ref.child(deleteId).deleteObject().then(() => deleteId = "")
    deleteId = ""
  );
});
function handleEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}
function handleDelete(name, id) {
  deleteId = id;
  $(".modal-wrapper, .hole-screen").fadeIn("fast");
}
function handleVisit(id) {
  window.location.href = `item.html?id=${id}`;
}