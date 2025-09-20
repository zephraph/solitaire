import { useKeyboard } from "@opentui/react";
import { assert, cloneDeep as clone, last } from "es-toolkit";
import { useAtom, useAtomValue } from "jotai";
import { Rank } from "./components/Card";
import {
  cardHasFaceUpCardsAboveIt,
  cardHasFaceUpCardsBelowIt,
  cyclePosition,
  getStackFromTableau,
  getTopTableauCardIndex,
  isCardMovableToFoundation,
  isCardMovableToTableau,
  useForceUpdate,
} from "./helpers";
import { cardAreaAtom, cardStackAtom, highlightedAreaAtom, highlightedCardAtom, selectedCardAtom } from "./store";

export const useHighlightCardControls = () => {
  const [highlighted, setHighlighted] = useAtom(highlightedAreaAtom);
  const tableau = useAtomValue(cardAreaAtom("tableau"));
  useKeyboard((key) => {
    switch (highlighted.area) {
      case "stock":
        if (key.name === "right") setHighlighted({ area: "waste", position: 0 });
        if (key.name === "left") setHighlighted({ area: "foundation", position: 3 });
        if (key.name === "down" || key.name === "up")
          setHighlighted({
            area: "tableau",
            position: 0,
            index: getTopTableauCardIndex(tableau, 0),
          });
        break;

      case "waste":
        if (key.name === "left") setHighlighted({ area: "stock", position: 0 });
        if (key.name === "right") setHighlighted({ area: "foundation", position: 0 });
        if (key.name === "down" || key.name === "up")
          setHighlighted({
            area: "tableau",
            position: 1,
            index: getTopTableauCardIndex(tableau, 1),
          });
        break;

      case "foundation":
        if (key.name === "down" || key.name === "up")
          setHighlighted({
            area: "tableau",
            position: highlighted.position + 3,
            index: getTopTableauCardIndex(tableau, highlighted.position + 3),
          });
        if (key.name === "left")
          highlighted.position === 0
            ? setHighlighted({ area: "waste", position: 0 })
            : setHighlighted({
                area: "foundation",
                position: highlighted.position - 1,
              });
        if (key.name === "right")
          highlighted.position === 3
            ? setHighlighted({ area: "stock", position: 0 })
            : setHighlighted({
                area: "foundation",
                position: highlighted.position + 1,
              });
        break;

      case "tableau": {
        if (key.name === "left" || key.name === "right") {
          const position = cyclePosition(key.name === "left" ? -1 : 1, highlighted.position);
          setHighlighted({
            area: "tableau",
            position,
            index: getTopTableauCardIndex(tableau, position),
          });
          return;
        }
        const stack = getStackFromTableau(tableau, highlighted.position);
        if (key.name === "up" && cardHasFaceUpCardsBelowIt(stack, highlighted.index)) {
          setHighlighted({
            area: "tableau",
            position: highlighted.position,
            index: highlighted.index - 1,
          });
        } else if (key.name === "down" && cardHasFaceUpCardsAboveIt(stack, highlighted.index)) {
          setHighlighted({
            area: "tableau",
            position: highlighted.position,
            index: highlighted.index + 1,
          });
        } else if (key.name === "up" || key.name === "down") {
          if (highlighted.position === 0) setHighlighted({ area: "stock", position: 0 });
          else if (highlighted.position === 1) setHighlighted({ area: "waste", position: 0 });
          else if (highlighted.position === 2)
            setHighlighted({
              area: "tableau",
              position: 2,
              index: getTopTableauCardIndex(tableau, 2),
            });
          else
            setHighlighted({
              area: "foundation",
              position: highlighted.position - 3,
            });
        }
        break;
      }
    }
  });
};

export const useStockControls = () => {
  const [stock, updateStock] = useAtom(cardAreaAtom("stock"));
  const [waste, updateWaste] = useAtom(cardAreaAtom("waste"));
  const highlighted = useAtomValue(highlightedAreaAtom);

  useKeyboard((key) => {
    if (key.name !== "space" || highlighted.area !== "stock") return;
    if (stock.length) {
      const newStock = clone(stock);
      const newWaste = clone(waste);
      const card = newStock.pop();
      assert(card, "Stock should not be empty");
      updateStock(newStock);
      updateWaste(newWaste.concat(card).map((card) => ({ ...card, faceUp: true, selected: false })));
    } else if (waste.length) {
      updateStock(
        clone(waste)
          .reverse()
          .map((card) => ({ ...card, faceUp: false, selected: false }))
      );
      updateWaste([]);
    }
  });
};

export const useSelectCardControls = () => {
  const forceUpdate = useForceUpdate();
  const highlightedArea = useAtomValue(highlightedAreaAtom);
  const [highlightedCard, updateHighlightedCard] = useAtom(highlightedCardAtom);
  const [highlightedStack, updateHighlightedStack] = useAtom(cardStackAtom(highlightedArea));
  const [selectedCard, setSelectedCard] = useAtom(selectedCardAtom);
  const [selectedStack, updateSelectedStack] = useAtom(cardStackAtom(selectedCard));
  const [foundation, updateFoundation] = useAtom(cardAreaAtom("foundation"));
  const moveCard = () => {
    if (!selectedCard) return;
    const selectedCardIndex = selectedStack.indexOf(selectedCard);
    const originStack = clone(selectedStack);
    const remainingStack = originStack.slice(0, selectedCardIndex);
    const movingStack = originStack.slice(selectedCardIndex);
    updateSelectedStack(remainingStack.map((card) => ({ ...card, selected: false })));

    updateHighlightedStack([
      ...highlightedStack,
      ...movingStack.map((card, index) => ({
        ...card,
        ...highlightedArea,
        selected: false,
        index: index + highlightedStack.length,
      })),
    ]);
  };
  useKeyboard((key) => {
    if (key.name !== "space" || highlightedArea.area === "stock") return;

    // Move card to empty space
    if (selectedCard && !highlightedCard) {
      // Move king to empty tableau space
      if (highlightedArea.area === "tableau" && selectedCard.rank === Rank.King) {
        moveCard();
      }
      // Move ace to empty foundation space
      if (
        highlightedArea.area === "foundation" &&
        selectedCard.rank === Rank.Ace &&
        last(selectedStack) === selectedCard
      ) {
        const newStack = clone(selectedStack);
        const cardToMove = {
          ...newStack.pop()!,
          ...highlightedArea,
          selected: false,
        };
        updateSelectedStack(newStack);
        updateFoundation([...foundation, cardToMove]);
      }
    }

    if (!highlightedCard) return;

    // Flip face down cards
    if (
      highlightedArea.area === "tableau" &&
      highlightedCard.faceUp === false &&
      last(highlightedStack) === highlightedCard
    ) {
      updateHighlightedCard({ ...highlightedCard, faceUp: true });
      forceUpdate();
      return;
    }

    // Select highlighted card
    if (!selectedCard) {
      setSelectedCard(highlightedCard);
      return;
    }

    // Unselect card
    else if (highlightedCard === selectedCard) {
      updateHighlightedCard({ ...highlightedCard, selected: false });
      return;
    }

    // Move card onto another card on tableau
    else if (highlightedArea.area === "tableau" && isCardMovableToTableau(highlightedCard, selectedCard)) {
      moveCard();
    }

    // Move card onto another card on the foundation
    else if (
      highlightedArea.area === "foundation" &&
      last(selectedStack) === selectedCard &&
      isCardMovableToFoundation(highlightedCard, selectedCard)
    ) {
      moveCard();
    }

    // Change what card is selected
    else {
      const newSelectedCard = clone(highlightedCard);
      setSelectedCard(newSelectedCard);
    }
  });
};
