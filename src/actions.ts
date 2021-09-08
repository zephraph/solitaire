import { gameState, createInitialState } from "./game";
import { findFristFaceUpCard, getTopCard } from "./helpers";
import { CardHighlight, Card } from "./types";
import { last } from "./utils";

export function startNewGame(seed: number) {
  Object.assign(gameState, createInitialState(seed));
}

export function selectCard(): void {
  const { selected, highlighted } = gameState;
  // If highlighted card is selected, deselect the card
  if (selected?.card) {
    if (highlighted.card?.key === selected.card.key) {
      gameState.selected = undefined;
      return;
    }
  }

  // If selecting from the stock, draw from the stock
  if (highlighted.area === "stock") return drawFromStock();

  // If there's no card in the highlight, skip
  if (!highlighted.card) return;

  // If it's in the waste or foundation just highlight as normal
  if (highlighted.area === "waste" || highlighted.area === "foundation") {
    gameState.selected = highlighted as Required<CardHighlight>;
    return;
  }

  // If it's on the tableau, face down, and its the top card then flip the card
  if (
    highlighted.card.face === "down" &&
    highlighted.card.key ===
      last(gameState[highlighted.area][highlighted.position])!.key
  ) {
    highlighted.card.face = "up";
    return;
  }

  // Otherwise if the card is face up select it
  if (highlighted.card.face === "up") {
    gameState.selected = highlighted as Required<CardHighlight>;
    return;
  }
}

function drawFromStock() {
  if (gameState.stock.length > 0) {
    let card = gameState.stock.pop()!;
    card.face = "up";
    gameState.waste.push(card);
  } else if (gameState.waste.length > 0) {
    gameState.stock = gameState.waste
      .map((card) => {
        card.face = "down";
        return card;
      })
      .reverse();
  }
}

export function shiftHighlightLeft() {
  const { area, position } = gameState.highlighted;
  switch (area) {
    case "stock":
      gameState.highlighted = {
        area: "foundation",
        position: 3,
        ...getTopCard(gameState.foundation[3]),
      };
      break;
    case "waste":
      gameState.highlighted = {
        area: "stock",
        position: 0,
        ...getTopCard(gameState.stock),
      };
      break;
    case "foundation":
      gameState.highlighted =
        position === 0
          ? {
              area: "waste",
              position: 0,
              ...getTopCard(gameState.waste),
            }
          : {
              area,
              position: position - 1,
              ...getTopCard(gameState.foundation[position - 1]),
            };
      break;
    case "tableau":
      let newPosition = (position + 6) % 7;
      gameState.highlighted = {
        area,
        position: newPosition,
        ...getTopCard(gameState.tableau[newPosition]),
      };
      break;
  }
}

export function shiftHighlightRight() {
  const { area, position } = gameState.highlighted;
  switch (area) {
    case "stock":
      gameState.highlighted = {
        area: "waste",
        position: 0,
        ...getTopCard(gameState.waste),
      };
      break;
    case "waste":
      gameState.highlighted = {
        area: "foundation",
        position: 0,
        ...getTopCard(gameState.foundation[0]),
      };
      break;
    case "foundation":
      gameState.highlighted =
        position === 3
          ? {
              area: "stock",
              position: 0,
              ...getTopCard(gameState.stock),
            }
          : {
              area,
              position: position + 1,
              ...getTopCard(gameState.foundation[position + 1]),
            };
      break;
    case "tableau":
      let newPosition = (position + 1) % 7;
      gameState.highlighted = {
        area,
        position: newPosition,
        ...getTopCard(gameState.tableau[newPosition]),
      };
      break;
  }
}

export function shiftHighlightUp() {
  const { area, position, index } = gameState.highlighted;
  switch (area) {
    case "stock":
      gameState.highlighted = {
        area: "tableau",
        position: 0,
        ...findFristFaceUpCard(gameState.tableau[0]),
      };
      break;
    case "waste":
      gameState.highlighted = {
        area: "tableau",
        position: 1,
        ...findFristFaceUpCard(gameState.tableau[1]),
      };
      break;
    case "foundation":
      let newPosition = position + 3;
      gameState.highlighted = {
        area: "tableau",
        position: newPosition,
        ...findFristFaceUpCard(gameState.tableau[newPosition]),
      };
      break;
    case "tableau":
      let topIndex = getTopCard(gameState.tableau[position]).index;
      if (index === topIndex) {
        if (position === 0) {
          gameState.highlighted = {
            area: "stock",
            position: 0,
            ...getTopCard(gameState.stock),
          };
        } else if (position === 1) {
          gameState.highlighted = {
            area: "waste",
            position: 0,
            ...getTopCard(gameState.waste),
          };
        } else if (position === 2) {
          gameState.highlighted = {
            area,
            position,
            ...getTopCard(gameState.tableau[position]),
          };
        } else {
          gameState.highlighted = {
            area: "foundation",
            position: position - 3,
            ...getTopCard(gameState.foundation[position]),
          };
        }
      } else {
        gameState.highlighted = {
          area,
          position,
          card: gameState.tableau[position][index + 1],
          index: index + 1,
        };
      }
      break;
  }
}

export function shiftHightlightDown() {}
