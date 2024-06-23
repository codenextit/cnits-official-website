var request = new XMLHttpRequest();
request.open("GET", "js/data/ui-ux.json", false);
request.send(null);
var data = JSON.parse(request.responseText);

document.addEventListener("DOMContentLoaded", function () {
  const items = data["data"];
  console.log(items);

  const itemsContainer = document.getElementById("ui_ux_work_items");
  const itemsChild = itemsContainer.children;
  const showMoreBtn = document.getElementById("showMoreBtn");
  const itemsPerPage = 6;
  let currentPage = 1;

  function renderItems() {
    itemsContainer.innerHTML = "";
    const start = 0;
    const end = currentPage * itemsPerPage;
    const visibleItems = items.slice(start, end);

    visibleItems.forEach((item) => {
      let worksItem = `
        <div class="container">
          <div class="ui_ux_work_item_wrapper">
            <div class="ui_ux_work_item_col">
              <div class="ui_ux_work_item_content">
              ${
                item["project_name"].length === 1
                  ? `<span class="project_name">${item["project_name"][0]}</span>`
                  : `<span class="project_name">${item["project_name"][0]}</span><span class="project_name">${item["project_name"][1]}</span>`
              }
                <h2>${item["title"]}</h2>
                <p>${item["desc"]}</p>

                <a href="#" class="project_btn">
                  View Project
                </a>
              </div>
            </div>

            <div class="ui_ux_work_item_col">
              <div class="ui_ux_work_item_content">
                <img src="./assets/img/ui-ux-design/${item["img"]}" alt="">
              </div>
            </div>
          </div>
        </div>
      `;
      const wrapper = document.createElement("div");
      wrapper.innerHTML = worksItem;
      wrapper.classList.add("ui_ux_work_item", "item", "visible");
      itemsContainer.appendChild(wrapper);
    });

    if (end >= items.length) {
      showMoreBtn.style.display = "none";
    } else {
      showMoreBtn.style.display = "grid";
      for (let i = 0; i < itemsChild.length; i++) {
        if (i % 2 !== 0) {
          // Even index (i starts from 0)
          itemsChild[i].classList.add("ui_ux_work_item_even");
        }
      }
    }
  }

  showMoreBtn.addEventListener("click", function () {
    currentPage++;
    renderItems();
    for (let i = 0; i < itemsChild.length; i++) {
      if (i % 2 !== 0) {
        // Even index (i starts from 0)
        itemsChild[i].classList.add("ui_ux_work_item_even");
      }
    }
  });

  renderItems(); // Initial render

  for (let i = 0; i < itemsChild.length; i++) {
    if (i % 2 !== 0) {
      // Even index (i starts from 0)
      itemsChild[i].classList.add("ui_ux_work_item_even");
    }
  }
});
