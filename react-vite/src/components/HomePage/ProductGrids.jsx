import ProductTile from "../ProductTile";
function ProductGrids({ products }) {
    return (
        <div className="product-grid">
            {products?.map((product) =>
                <ProductTile key={product.id} product={product} />
            )}
        </div>
    );
}
export default ProductGrids;
