// 選取 DOM
const btn_add = document.querySelector(".btn_add");
const input_content = document.querySelector("#input_content");
const list = document.querySelector(".list");
const list_footer_taskNum = document.querySelector(".list_footer p");
const list_footer_clear = document.querySelector(".list_footer a");
const tabs = document.querySelectorAll(".tab li");

// 清單資料
let list_data = [];

// 目前分類
let list_status = "全部";

// 渲染畫面
const render = () => {
  if (list_data.length == 0) {
    list.innerHTML = `
      <li class="list_empty">目前沒有待辦事項</li>
    `
  } else {
    let content = "";
    if (list_status == "全部") {
      list_data.forEach((item, index) => {
        content += `
          <li>
            <label class="checkbox" for="">
            <input data-num=${index} type="checkbox" ${item.status == "已完成" ? "checked" : ""}/>
            <span>${item.event}</span>
            </label>
            <a data-num=${index} href="#" class="delete"></a>
          </li>
        `
      })
    } else {
      list_data.forEach((item, index) => {
        if (item.status == list_status) {
          content += `
            <li>
              <label class="checkbox" for="">
              <input data-num=${index} type="checkbox" ${item.status == "已完成" ? "checked" : ""}/>
              <span>${item.event}</span>
              </label>
              <a data-num=${index} href="#" class="delete"></a>
            </li>
          `
        }
      })
    }
    list.innerHTML = content;
  }

  // 計算待辦事項數量
  let task_num = 0;
  list_data.forEach(item => { if (item.status == "待完成") task_num += 1; })
  list_footer_taskNum.textContent = `${task_num} 個待完成項目`
}


// 監聽新增項目按鈕
btn_add.addEventListener("click", (e) => {
  e.preventDefault();
  if (input_content.value.trim() == "") {
    alert("請輸入文字");
    input_content.value = "";
    return;
  }
  list_data.push({ event: input_content.value, status: "待完成" });
  input_content.value = "";
  alert("成功新增項目");
  render();
});

// 監聽刪除項目按鈕
list.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") == "delete") {
    e.preventDefault();
    const delete_index = e.target.getAttribute("data-num");
    alert(`已將「${list_data[delete_index].event}」項目移除`);
    list_data.splice(delete_index, 1);
    render();
  } else if (e.target.nodeName == "INPUT") {
    // 判斷是否完成項目
    const data_index = e.target.getAttribute("data-num");
    list_data[data_index].status = e.target.checked ? "已完成" : "待完成";
    render();
  }
});

// 監聽分類清單
tabs.forEach(item => {
  item.addEventListener("click", function (e) {
    tabs.forEach(item => item.classList.remove("active"));
    item.classList.add('active');
    list_status = e.target.textContent;
    render();
  });
})

// 清除已完成項目
list_footer_clear.addEventListener("click", (e) => {
  const newListData = list_data.filter((item) => {
    return item.status == "待完成";
  })
  if (list_data.length == newListData.length) {
    alert("目前沒有已完成的項目");
  } else {
    alert("已清除已完成的項目");
    list_data = newListData;
    render();
  }
})

// 初始渲染畫面
render();