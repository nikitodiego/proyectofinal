class ProductoDto {
    constructor(data) {
        this.title = data.title
        this.price = data.price
        this.thumbnail = data.thumbnail
        this.stock = data.stock
        this.price_off = data.price*0.85
    }
}

export default ProductoDto