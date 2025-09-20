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
  highlighted?: boolean;
  selected?: boolean;
  rank: Rank;
  suit: Suit;
}

interface CardFaceDownProps {
  highlighted?: boolean;
}
export function CardFaceDown({ highlighted = false }: CardFaceDownProps) {
  const color = highlighted ? "yellow" : "blue";
  return (
    <box
      flexDirection="column"
      border
      borderStyle="rounded"
      borderColor={highlighted ? "yellow" : "white"}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
    >
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
    </box>
  );
}

export default function Card(props: CardProps) {
  const {
    faceUp = false,
    rank,
    suit,
    highlighted = false,
    selected = false,
  } = props;
  const color =
    suit === Suit.Hearts || suit === Suit.Diamonds ? "brightred" : undefined;
  return !faceUp ? (
    <CardFaceDown highlighted={highlighted} />
  ) : (
    <box
      flexDirection="column"
      justifyContent="space-between"
      border
      borderStyle="rounded"
      borderColor={selected ? "cyan" : highlighted ? "yellow" : "white"}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      backgroundColor="black"
    >
      <text fg={selected ? "cyan" : color}>
        {rank}
        {suit}
      </text>
      <box flexDirection="row" justifyContent="flex-end">
        <text fg={selected ? "cyan" : color}>
          {suit}
          {rank}
        </text>
      </box>
    </box>
  );
}
