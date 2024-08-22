import {useState} from "react";
import ProductCard from "../components/ProductCard.tsx";
import {useCategoriesQuery, useSearchProductsQuery} from "../redux/api/productAPI.ts";
import {CustomError, Pagination} from "../types/api-types.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../components/Loader.tsx";

const Search = () => {
	const {
		data: categoriesResponse,
		isLoading: loadingCategories,
		isError,
		error,
	} = useCategoriesQuery();
	const categories = categoriesResponse?.payload || [];

	const [search, setSearch] = useState<string>("");
	const [sort, setSort] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<number>(100000);
	const [category, setCategory] = useState<string>("");
	const [page, setPage] = useState<number>(1);

	// * Search By Query
	const {data: searchResponse, isLoading: loadingSearch} = useSearchProductsQuery({
		search,
		sort,
		category,
		page,
		price: maxPrice,
	});
	const searchData = searchResponse?.payload || [];
	const pagination = (searchResponse?.pagination as Pagination) || {};

	// ! Error
	if (isError) {
		const err = error as CustomError;
		toast.error(err.data.message);
	}
	const handleAddToCart = () => {
		console.log("Added to Cart");
	};

	const isPrevPage = page > 1;
	const isNextPage = page < (pagination?.totalPages ?? 0);

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
					<input
						onChange={(e) => setMaxPrice(Number(e.target.value))}
						value={maxPrice}
						min={100}
						max={100000}
						type='range'
					/>
				</div>
				<div>
					<h4>Category</h4>
					<select
						onChange={(e) => setCategory(e.target.value)}
						value={category}
						name='category'
						id=''>
						<option value=''>ALL</option>
						{loadingCategories ? (
							<option value=''>Loading...</option>
						) : (
							categories.map((category) => (
								<option key={category} value={category}>
									{category.toUpperCase()}
								</option>
							))
						)}
					</select>
				</div>
			</aside>
			<main>
				<h1>Products</h1>
				<input
					onChange={(e) => setSearch(e.target.value)}
					type='text'
					value={search}
					placeholder='Search By Name...'
				/>

				{loadingSearch ? (
					<Skeleton length={10} />
				) : (
					<div className='search_product_list'>
						{searchData &&
							searchData.map((product) => (
								<ProductCard
									key={product?._id}
									productId={product?._id}
									image={product?.image}
									name={product?.name}
									price={product?.price}
									stock={product?.stock}
									handler={handleAddToCart}
								/>
							))}
					</div>
				)}
				{searchData && pagination?.totalPages! > 1 && (
					<article>
						<button
							onClick={() => setPage((prev) => prev - 1)}
							disabled={!isPrevPage}
							type='button'>
							Prev
						</button>
						<span>
							{page} of {pagination?.totalPages}
						</span>
						<button
							onClick={() => setPage((prev) => prev + 1)}
							disabled={!isNextPage}
							type='button'>
							Next
						</button>
					</article>
				)}
			</main>
		</div>
	);
};
export default Search;
