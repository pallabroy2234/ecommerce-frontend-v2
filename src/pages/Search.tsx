import {useState} from "react";
import ProductCard from "../components/ProductCard.tsx";

const Search = () => {
	const [search, setSearch] = useState<any>("");
	const [sort, setSort] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<number>(100000);
	const [category, setCategory] = useState<string>("");
	const [page, setPage] = useState<number>(1);

	const handleAddToCart = () => {
		console.log("Added to Cart");
	};

	const isNextPage = false;
	const isPrevPage = true;

	return (
		<div className='product_search_page'>
			<aside>
				<h2>Filters</h2>
				<div>
					<h4>Sort</h4>
					<select onChange={(e) => setSort(e.target.value)} value={sort} name='' id=''>
						<option value=''>None</option>
						<option value='asc'>Price (Low to High)</option>
						<option value='dsc'>Price (High to Low)</option>
					</select>
				</div>
				<div>
					<h4>Max Price{maxPrice || ""}</h4>
					<input onChange={(e) => setMaxPrice(Number(e.target.value))} value={maxPrice} min={100} max={100000} type='range' />
				</div>
				<div>
					<h4>Category</h4>
					<select onChange={(e) => setCategory(e.target.value)} value={category} name='category' id=''>
						<option value=''>All</option>
						<option value=''>Sample 1</option>
						<option value=''>Sample 2</option>
					</select>
				</div>
			</aside>
			<main>
				<h1>Products</h1>
				<input onChange={(e) => setSearch(e.target.value)} type='text' value={search} placeholder='Search By Name...' />

				<div className='search_product_list'>
					<ProductCard productId='asdfasd' image='https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg' name='Apple Macbook' price={1000} stock={20} handler={handleAddToCart} />
				</div>
				<article>
					<button onClick={() => setPage((prev) => prev - 1)} disabled={!isPrevPage} type='button'>
						Prev
					</button>
					<span>
						{page} of {4}
					</span>
					<button onClick={() => setPage((prev) => prev + 1)} disabled={!isNextPage} type='button'>
						Next
					</button>
				</article>
			</main>
		</div>
	);
};
export default Search;
