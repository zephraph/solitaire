import { gameState, createInitialState } from "./game";
import { findFristFaceUpCard, getTopCard } from "./helpers";
import { CardHighlight } from "./types";
import { last } from "./utils";

export function startNewGame(seed: number) {
  Object.assign(gameState, createInitialState(seed));
}

export function selectCard(): void {
  const { selected, highlighted, tableau } = gameState.get();
  // If highlighted card is selected, deselect the card
  if (selected?.card) {
    if (highlighted.card?.text === selected.card.text) {
      gameState.mutate((state) => {
        state.selected = undefined;
      });
      return;
    }
  }

  // If selecting from the stock, draw from the stock
  if (highlighted.area === "stock") return drawFromStock();

  // If there's no card in the highlight, skip
  if (!highlighted.card) return;

  // If it's in the waste or foundation just highlight as normal
  if (highlighted.area === "waste" || highlighted.area === "foundation") {
    gameState.mutate((state) => {
      state.selected = highlighted as Required<CardHighlight>;
    });
    return;
  }

  // If it's on the tableau, face down, and its the top card then flip the card
  if (
    highlighted.card.face === "down" &&
    highlighted.card.text === last(tableau[highlighted.position])!.text
  ) {
    highlighted.card.face = "up";
    return;
  }

  // Otherwise if the card is face up select it
  if (highlighted.card.face === "up") {
    gameState.mutate((state) => {
      state.selected = highlighted as Required<CardHighlight>;
    });
    return;
  }
}

function drawFromStock() {
  const { stock, waste } = gameState.get();
  if (stock.length > 0) {
    gameState.mutate((state) => {
      let card = state.stock.pop()!;
      card.face = "up";
      state.waste.push(card);
    });
  } else if (waste.length > 0) {
    gameState.mutate((state) => {
      state.stock = state.waste
        .map((card) => {
          card.face = "down";
          return card;
        })
        .reverse();
    });
  }
}

export function shiftHighlightLeft() {
  const { area, position } = gameState.get().highlighted;
  switch (area) {
    case "stock":
      gameState.mutate((state) => {
        state.highlighted = {
          area: "foundation",
          position: 3,
          ...getTopCard(state.foundation[3]),
        };
      });
      break;
    case "waste":
      gameState.mutate((state) => {
        state.highlighted = {
          area: "stock",
          position: 0,
          ...getTopCard(state.stock),
        };
      });
      break;
    case "foundation":
      gameState.mutate((state) => {
        state.highlighted =
          position === 0
            ? {
                area: "waste",
                position: 0,
                ...getTopCard(state.waste),
              }
            : {
                area,
                position: position - 1,
                ...getTopCard(state.foundation[position - 1]),
              };
      });
      break;
    case "tableau":
      let newPosition = (position + 6) % 7;
      gameState.mutate((state) => {
        state.highlighted = {
          area,
          position: newPosition,
          ...getTopCard(state.tableau[newPosition]),
        };
      });
      break;
  }
}

export function shiftHighlightRight() {
  const { area, position } = gameState.get().highlighted;
  switch (area) {
    case "stock":
      gameState.mutate((state) => {
        state.highlighted = {
          area: "waste",
          position: 0,
          ...getTopCard(state.waste),
        };
      });
      break;
    case "waste":
      gameState.mutate((state) => {
        state.highlighted = {
          area: "foundation",
          position: 0,
          ...getTopCard(state.foundation[0]),
        };
      });
      break;
    case "foundation":
      gameState.mutate((state) => {
        state.highlighted =
          position === 3
            ? {
                area: "stock",
                position: 0,
                ...getTopCard(state.stock),
              }
            : {
                area,
                position: position + 1,
                ...getTopCard(state.foundation[position + 1]),
              };
      });
      break;
    case "tableau":
      let newPosition = (position + 1) % 7;
      gameState.mutate((state) => {
        state.highlighted = {
          area,
          position: newPosition,
          ...getTopCard(state.tableau[newPosition]),
        };
      });
      break;
  }
}

export function shiftHighlightUp() {
  const { area, position, index } = gameState.get().highlighted;
  switch (area) {
    case "stock":
      gameState.mutate((state) => {
        state.highlighted = {
          area: "tableau",
          position: 0,
          ...findFristFaceUpCard(state.tableau[0]),
        };
      });
      break;
    case "waste":
      gameState.mutate((state) => {
        state.highlighted = {
          area: "tableau",
          position: 1,
          ...findFristFaceUpCard(state.tableau[1]),
        };
      });
      break;
    case "foundation":
      let newPosition = position + 3;
      gameState.mutate((state) => {
        state.highlighted = {
          area: "tableau",
          position: newPosition,
          ...findFristFaceUpCard(state.tableau[newPosition]),
        };
      });
      break;
    case "tableau":
      gameState.mutate((state) => {
        let topIndex = getTopCard(state.tableau[position]).index;
        if (index === topIndex) {
          if (position === 0) {
            state.highlighted = {
              area: "stock",
              position: 0,
              ...getTopCard(state.stock),
            };
          } else if (position === 1) {
            state.highlighted = {
              area: "waste",
              position: 0,
              ...getTopCard(state.waste),
            };
          } else if (position === 2) {
            state.highlighted = {
              area,
              position,
              ...getTopCard(state.tableau[position]),
            };
          } else {
            state.highlighted = {
              area: "foundation",
              position: position - 3,
              ...getTopCard(state.foundation[position]),
            };
          }
        } else {
          state.highlighted = {
            area,
            position,
            card: state.tableau[position][index + 1],
            index: index + 1,
          };
        }
      });
      break;
  }
}

export function shiftHightlightDown() {
  const { area, position, index } = gameState.get().highlighted;
  switch (area) {
    case "stock":
      gameState.mutate((state) => {
        let { index, card } = findFristFaceUpCard(state.tableau[0]);
        state.highlighted = {
          area: "tableau",
          position: 0,
          card,
          index,
        };
      });
      break;
    case "waste":
      gameState.mutate((state) => {
        let { index, card } = findFristFaceUpCard(state.tableau[1]);
        state.highlighted = {
          area: "tableau",
          position: 1,
          card,
          index,
        };
      });
      break;
    case "foundation":
      gameState.mutate((state) => {
        const newPosition = position + 3;
        const { index, card } = findFristFaceUpCard(state.tableau[newPosition]);
        state.highlighted = {
          area: "tableau",
          position: newPosition,
          card,
          index,
        };
      });
      break;
    case "tableau":
      gameState.mutate((state) => {
        const stack = state.tableau[position];
        if (index === stack.length - 1) {
          if (position === 0) {
            state.highlighted = {
              area: "stock",
              position: 0,
              ...getTopCard(state.stock),
            };
          } else if (position === 1) {
            state.highlighted = {
              area: "waste",
              position: 0,
              ...getTopCard(state.waste),
            };
          } else if (position === 2) {
            state.highlighted = {
              area,
              position,
              ...findFristFaceUpCard(stack),
            };
          } else {
            state.highlighted = {
              area: "foundation",
              position: position - 3,
              ...getTopCard(state.foundation[position - 3]),
            };
          }
        } else {
          state.highlighted = {
            area,
            position,
            index: index + 1,
            card: stack[index + 1],
          };
        }
      });
  }
}
