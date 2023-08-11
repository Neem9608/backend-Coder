class ProductManager {
    products;

    constructor() {
        this.products = [];
    }

    getProducts() {
        console.log(this.products);
    }

    getId() {
        let data = this.products;
        return data.length + 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        const repeatCode = this.products.some(e => e.code === newProduct.code);

        if (repeatCode) {
            console.log("El código está repetido");
        } else {
            this.products.push({ ...newProduct, id: this.getId() });
        }
    }

    getProductById(id) {
        let productFind = this.products.find(e => e.id === id);
        
        if (productFind === undefined) {
            console.log("Producto no encontrado");
        } else {
            return productFind;
        }
    }

    deleteProductById(id) {
        let i = this.products.findIndex(e => e.id === id);

        if (i !== -1) {
            this.products.splice(i, 1);
        } else {
            console.log("Producto no encontrado");
        }
    }
}
