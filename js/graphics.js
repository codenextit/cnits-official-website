var request = new XMLHttpRequest();
request.open("GET", "js/data/graphics.json", false);
request.send(null);
var data = JSON.parse(request.responseText);

document.addEventListener("DOMContentLoaded", function () {
  const items = data["data"];
  console.log(items);

  const itemsContainer = document.getElementById("graphics_work_items");
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
          <div class="graphics_work_item_wrapper">
            <div class="graphics_work_item_col">
              <div class="graphics_work_item_content">
                <div class="flip_card">
                  <div class='front'>
                    <img src="./assets/img/graphics-design/${item["img1"]}" alt="">
                  </div>
                  <div class='back'>
                    <h4>${item["title1"]}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div class="graphics_work_item_col">
              <div class="graphics_work_item_content">
                <div class="flip_card">
                  <div class='front'>
                    <img src="./assets/img/graphics-design/${item["img2"]}" alt="">
                  </div>
                  <div class='back'>
                    <h4>${item["title2"]}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      const wrapper = document.createElement("div");
      wrapper.innerHTML = worksItem;
      wrapper.classList.add("graphics_work_item", "item", "visible");
      itemsContainer.appendChild(wrapper);
    });

    if (end >= items.length) {
      showMoreBtn.style.display = "none";
    } else {
      showMoreBtn.style.display = "grid";
      for (let i = 0; i < itemsChild.length; i++) {
        if (i % 2 !== 0) {
          // Even index (i starts from 0)
          itemsChild[i].classList.add("graphics_work_item_even");
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
        itemsChild[i].classList.add("graphics_work_item_even");
      }
    }
  });

  renderItems(); // Initial render

  for (let i = 0; i < itemsChild.length; i++) {
    if (i % 2 !== 0) {
      // Even index (i starts from 0)
      itemsChild[i].classList.add("graphics_work_item_even");
    }
  }
});
