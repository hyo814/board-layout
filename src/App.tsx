import React, { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/Card";
import postsData from "./data/posts.json";
// import Table from "./components/Table";

function transformData(data) {
	return data.map(post => ({
		id: post.id,
		uploadDate: post.upload_date,
		title: post.title,
		views: post.views,
		isBookmarked: post.bookmark,
	}));
}

function App() {
	const [cards, setCards] = useState(transformData(postsData));
	const [sortOrder, setSortOrder] = useState("recent");
	
	useEffect(() => {
		setCards(transformData(postsData));
	}, []);
	
	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOrder(event.target.value);
	};
	
	return (
		<div className="container">
			<div className="section __order">
				<select id="order_type" value={sortOrder} onChange={handleSortChange}>
					<option value="recent">최근등록순</option>
					<option value="views">조회순</option>
					<option value="bookmarked">북마크순</option>
				</select>
			</div>
			<div className="section">
				<CardList cards={cards} sortOrder={sortOrder} setCards={setCards} />
				{/*<Table />*/}
			</div>
		</div>
	);
}

export default App;
