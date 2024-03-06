import mongoose from "mongoose";
import ProductManager from "../../src/dao/managersMongoDB/ProductsManager.js"
import { expect } from "chai";
import { URI,generateProduct } from "../../src/utils.js";
describe('Product dao tests', function() {
    before(async function() {
        this.timeout(10000);
        await mongoose.connect(URI)
    });
    beforeEach(async function () {
        //await mongoose.connection.collections.products.drop();
        this.timeout(10000);
   })
    after(async function () {
        await mongoose.connection.close();
    })

    it('Expect to get product list',async function(){
        const result= await ProductManager.getProducts();
        expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(result)).to.be.equal(true);


    });
    it('Expect to add a new product to database',async function() {
        const result= await ProductManager.addProduct(generateProduct());
        expect(result).to.be.ok;
        expect(result).to.have.property('_id')
    } )
    it('Expect to get product by id', async function () {
        const result = await ProductManager.getProductById('655ab5ef38b839e1b54a3839');
        expect(result).to.be.ok;
        expect(result).to.have.property('_id')
        expect(result.title).to.be.equal('Matsutake');
    })
    it("Expect to update product by id",async function() {
        const result = await ProductManager.updateProductById('655ab62838b839e1b54a3840',{
            title:"Mushroom",
            description:"Fungus 13",
            price:123,
            thumbnail:[],
            code:"m123",
            stock:99,
            category:"fungi",
        });
        expect(result).to.be.ok;
        expect(result).to.have.property('_id');
        expect(result.title).to.be.equal('Mushroom');
        expect(result.description).to.be.equal('Fungus 13');
        expect(result.price).to.be.equal(123);
        expect(result.thumbnail).to.be.deep.equal([]);
        expect(result.code).to.be.equal('m123');
        expect(result.status).to.be.equal(true);
        expect(result.stock).to.be.equal(99);
        expect(result.category).to.be.equal('fungi');
        
    })
})