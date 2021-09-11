import Stock from "./components/Board/Stock";
import { gameState, GameState } from "./game";
import { CardHighlight, Rank } from "./types";
import type { Card, CardArea, CardSelection } from "./types";
import { last } from "./utils";

export function getTopCard(cardStack: Card[]) {
  return {
    index: cardStack.length > 0 ? cardStack.length - 1 : 0,
    card: last(cardStack),
  };
}

export function findFristFaceUpCard(cardStack: Card[]) {
  for (let index = 0; index < cardStack.length; index++) {
    if (cardStack[index].face === "up") {
      return {
        card: cardStack[index],
        index,
      };
    }
  }
  return getTopCard(cardStack);
}

function rankToNumber(rank: Rank): number {
  const num = parseInt(rank);
  if (!isNaN(num)) return num;
  if (rank === Rank.Ace) return 1;
  if (rank === Rank.Jack) return 11;
  if (rank === Rank.Queen) return 12;
  if (rank === Rank.King) return 13;
  return -1;
}

export function isSameSuit(card1: Card, card2: Card) {
  return card1.suit === card2.suit;
}
export function isOneAboveInRank(card1: Card, card2: Card) {
  return rankToNumber(card1.rank) + 1 === rankToNumber(card2.rank);
}
export function isTopCard({
  area,
  position,
  index,
}: Omit<CardHighlight, "card">) {
  const areaCards = gameState.get()[area];
  const stack = Array.isArray(areaCards) ? areaCards[position] : areaCards;
  const topCard = Array.isArray(stack)
    ? getTopCard(stack)
    : { index, card: stack };
  return topCard.index === index;
}
