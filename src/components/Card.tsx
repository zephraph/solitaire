import React, { FC } from "react";
import { Box, Text, Spacer } from "ink";

export const CARD_WIDTH = 10;
export const CARD_HEIGHT = 7;

export enum Rank {
	Ace = "A",
	Two = "2",
	Three = "3",
	Four = "4",
	Five = "5",
	Six = "6",
	Seven = "7",
	Eight = "8",
	Nine = "9",
	Ten = "10",
	Jack = "J",
	Queen = "Q",
	King = "K",
}

export enum Suit {
	Hearts = "♥",
	Diamonds = "♦",
	Spades = "♠",
	Clubs = "♣",
}

interface CardProps {
	faceUp?: boolean;
	selected?: boolean;
	rank: Rank;
	suit: Suit;
}

const CardFaceDown = () => (
	<Box
		borderStyle="round"
		borderColor="blue"
		width={CARD_WIDTH}
		height={CARD_HEIGHT}
		flexDirection="column"
	>
		<Text color="blue">▚▚▚▚▚▚▚▚</Text>
		<Text color="blue">▚▚▚▚▚▚▚▚</Text>
		<Text color="blue">▚▚▚▚▚▚▚▚</Text>
		<Text color="blue">▚▚▚▚▚▚▚▚</Text>
		<Text color="blue">▚▚▚▚▚▚▚▚</Text>
	</Box>
);

const Card: FC<CardProps> = (props) => {
	const { faceUp = false, rank, suit, selected = false } = props;
	const color = suit === Suit.Hearts || suit === Suit.Diamonds ? "red" : null;
	return !faceUp ? (
		<CardFaceDown />
	) : (
		<Box
			borderStyle="round"
			width={CARD_WIDTH}
			height={CARD_HEIGHT}
			flexDirection="column"
			borderColor={(selected && "yellow") || null}
		>
			<Box>
				<Text color={color}>
					{rank}
					{suit}
				</Text>
			</Box>
			<Spacer />
			<Box justifyContent="flex-end">
				<Text color={color}>
					{suit}
					{rank}
				</Text>
			</Box>
		</Box>
	);
};

export default Card;
