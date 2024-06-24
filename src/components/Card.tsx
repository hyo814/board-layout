import React, { useEffect, useState } from "react";
import "./Card.css";

interface CardProps {
	id: number;
	uploadDate: string;
	title: string;
	views: number;
	isBookmarked: boolean;
	toggleBookmark: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, uploadDate, title, views, isBookmarked, toggleBookmark }) => {
	return (
		<li className="card--container" id={String(id)}>
			<div className="header">
				<div className="card--tag">
					<span className="upload-date">{uploadDate}</span>
				</div>
				<div className="card--tag" onClick={() => toggleBookmark(id)}>
					<span className={`icon bookmark ${isBookmarked ? "bookmarked" : ""}`}>
						<i className="fa fa-bookmark"></i>
					</span>
				</div>
			</div>
			<div className="card--content">
				<span className="title">{title}</span>
			</div>
			<div className="footer">
				<div className="card--tag">
					<span className="views">{views}</span>
					views
				</div>
			</div>
		</li>
	);
};

interface CardListProps {
	cards: {
		id: number;
		uploadDate: string;
		title: string;
		views: number;
		isBookmarked: boolean;
	}[];
	sortOrder: string;
	setCards: React.Dispatch<React.SetStateAction<CardListProps["cards"]>>;
}

const CardList: React.FC<CardListProps> = ({ cards, sortOrder, setCards }) => {
	const [sortedCards, setSortedCards] = useState(cards);
	
	useEffect(() => {
		const sorted = sortCards(cards, sortOrder);
		setSortedCards(sorted);
	}, [sortOrder, cards]);
	
	const toggleBookmark = (id: number) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
			)
		);
	};
	
	const sortCards = (cards: CardListProps['cards'], order: string) => {
		let sorted = [...cards];
		if (order === "recent") {
			sorted = sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
		} else if (order === "views") {
			sorted = sorted.sort((a, b) => b.views - a.views);
		} else if (order === "bookmarked") {
			sorted = sorted.sort((a, b) => Number(b.isBookmarked) - Number(a.isBookmarked));
		}
		return sorted;
	};
	
	return (
		<div>
			<ul className="card-list">
				{sortedCards.map((card) => (
					<Card key={card.id} {...card} toggleBookmark={toggleBookmark} />
				))}
			</ul>
		</div>
	);
};

export default CardList;
