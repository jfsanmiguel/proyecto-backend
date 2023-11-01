import * as fs from "fs";

class ProductManager {

    constructor(path) {
        this.path = path;
    }


    async addProduct(title, description, price, thumbnail, code, stock, category) {
        const products = await getJsonFromFile(this.path);
        let pid = products.find(ide => ide.code === code);
        let init=1;
        if (pid) {
            console.log(" the product with the code " + code + " already exists")
            return
        } else if (!title || !description || !price || !thumbnail || !stock || !category) {
            console.log("Please fill all entries");
        } else {
            const newProduct = {
                title,
                description,
                price,
                thumbnail:[thumbnail],
                code,
                status: true,
                stock,
                category,
                id: Date.now()+ init,

            }
            products.push(newProduct);
            await saveJsonInFile(this.path, products);
            init++;
            console.log('product added successfully');
        }

    }
    getProducts() {
        return getJsonFromFile(this.path);
    }
    async getProductById(code) {
        const products = await getJsonFromFile(this.path);
        let productId = products.find(ide => ide.id === code);
        if (!productId) {
            console.log("Not found");
            return
        } else {
            console.log(productId);
            return productId
        }

    }
    async updateProduct(id, change, value) {
        const products = await getJsonFromFile(this.path);
        let product = products.find(pro => pro.id === id);
        if (product) {
            if (change === 'title') {
                product.title = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'description') {
                product.description = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'price') {
                product.price = value;
                await saveJsonInFile(this.path, products);
            }
            else if (change === 'code') {
                product.code = value;
                await saveJsonInFile(this.path, products);
            }else if (change === 'status') {
                product.status = value;
                await saveJsonInFile(this.path, products);
            }
            else if (change === 'thumbnail') {
                product.thumbnail = product.thumbnail.push(value);
                await saveJsonInFile(this.path, products);
            }
            else if (change === 'stock') {
                product.stock = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'category') {
                product.category = value;
                await saveJsonInFile(this.path, products);
            }
            else {
                console.log('please enter a valid property to change such as title,description,price,thumbnail,stock ')
            }

        } else {
            console.log('Product does not exist');
        }
    }

    async deleteProduct(id) {
        const products = await getJsonFromFile(this.path);
        let product = products.find(pro => pro.id === id);
        if (!product || !products) {
            console.log('Product does not exist');
        } else {
            const index = products.indexOf(product);
            const deleted = products.splice(index, 1);
            await saveJsonInFile(this.path, products);
            console.log("the product was successfully deleted");
        }
    }

}

const getJsonFromFile = async (path) => {
    if (!fs.existsSync(path)) {
        return [];

    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
};

const saveJsonInFile = (path, data) => {
    const content = JSON.stringify(data, null, '\t');//tabulación
    return fs.promises.writeFile(path, content, 'utf-8'); // return vale como async await (devuelve promesa)
}


export default ProductManager