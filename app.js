// セッション内でのみデータを保持
let items = JSON.parse(sessionStorage.getItem('items')) || [];

// アイテム一覧の表示を更新する
function updateItemList() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // 現在のリストをクリア

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const nameElement = document.createElement('span');
        nameElement.textContent = item.name;
        nameElement.classList.add('item-name');

        const quantityElement = document.createElement('span');
        quantityElement.textContent = item.quantity;
        quantityElement.classList.add('quantity');

        // 増減ボタン
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => updateQuantity(index, item.quantity + 1);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = () => updateQuantity(index, item.quantity - 1);

        itemElement.appendChild(nameElement);
        itemElement.appendChild(decreaseButton);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(increaseButton);

        itemList.appendChild(itemElement);
    });

    // セッションストレージに保存
    sessionStorage.setItem('items', JSON.stringify(items));
}

// アイテムを追加する
function addItem() {
    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity').value, 10);

    if (itemName && itemQuantity > 0) {
        items.push({ name: itemName, quantity: itemQuantity });
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = 1;
        updateItemList();
    }
}

// 数量を更新する
function updateQuantity(index, newQuantity) {
    if (newQuantity >= 0) {
        items[index].quantity = newQuantity;
        updateItemList();
    }
}

// ページ読み込み時にリストを更新
document.addEventListener('DOMContentLoaded', updateItemList);