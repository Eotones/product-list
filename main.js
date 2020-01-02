const product_list = document.getElementById("product_list");
const update = document.getElementById("update");

const main = {
    init: function(){
        //
        this.getProducts();
    },
    getProducts: function(){
        fetch(
            './products.json',
            {
                method: 'get', // GET, POST
                headers: {
                    'content-type': 'application/json'
                },
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                mode: 'same-origin', // no-cors, cors, *same-origin
            }
        ).then((response) => {
            return response.json();
        }).then((myJson) => {
            console.log(myJson);

            update.innerText = `最後更新時間: ${myJson.update}`;

            myJson.products.forEach((element) => {
                let product_name = element.name;
                let product_price = this.numberWithCommas(element.price);

                let template = `
                    <div class="product flex_item">
                        <div class="product_name">${product_name}</div>
                        <div class="product_price">\$ ${product_price}</div>
                    </div>
                `;

                product_list.innerHTML = product_list.innerHTML + template;
            });
        });
    },
    numberWithCommas: function (x) { //數字千位加逗點 ( '1000' => '1,000' )
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

(function(){
    main.init();
})();