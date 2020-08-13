import { useInput } from "ink";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  highlightedAreaState,
  cardAreaState,
  selectedCardState,
  highlightedCardState,
  cardStackState,
} from "./state";
import {
  getStackFromTableau,
  getTopTableauCardIndex,
  cyclePosition,
  cardHasFaceUpCardsBelowIt,
  cardHasFaceUpCardsAboveIt,
  isOppositeSuit,
  isCardMovableToTableau,
  useForceUpdate,
  isCardMovableToFoundation,
} from "./helpers";
import clone from "lodash/cloneDeep";
import last from "lodash/last";
import { Suit, Rank } from "./components/Card";

export const useHighlightCardControls = () => {
  const [highlighted, setHighlighted] = useRecoilState(highlightedAreaState);
  const tableau = useRecoilValue(cardAreaState("tableau"));
  useInput((_, key) => {
    switch (highlighted.area) {
      case "stock":
        if (key.rightArrow) setHighlighted({ area: "waste", position: 0 });
        if (key.leftArrow) setHighlighted({ area: "foundation", position: 3 });
        if (key.downArrow || key.upArrow)
          setHighlighted({
            area: "tableau",
            position: 0,
            index: getTopTableauCardIndex(tableau, 0),
          });
        break;

      case "waste":
        if (key.leftArrow) setHighlighted({ area: "stock", position: 0 });
        if (key.rightArrow) setHighlighted({ area: "foundation", position: 0 });
        if (key.downArrow || key.upArrow)
          setHighlighted({
            area: "tableau",
            position: 1,
            index: getTopTableauCardIndex(tableau, 1),
          });
        break;

      case "foundation":
        if (key.downArrow || key.upArrow)
          setHighlighted({
            area: "tableau",
            position: highlighted.position + 3,
            index: getTopTableauCardIndex(tableau, highlighted.position + 3),
          });
        if (key.leftArrow)
          highlighted.position === 0
            ? setHighlighted({ area: "waste", position: 0 })
            : setHighlighted({
                area: "foundation",
                position: highlighted.position - 1,
              });
        if (key.rightArrow)
          highlighted.position === 3
            ? setHighlighted({ area: "stock", position: 0 })
            : setHighlighted({
                area: "foundation",
                position: highlighted.position + 1,
              });
        break;

      case "tableau":
        if (key.leftArrow || key.rightArrow) {
          const position = cyclePosition(
            key.leftArrow ? -1 : 1,
            highlighted.position
          );
          setHighlighted({
            area: "tableau",
            position,
            index: getTopTableauCardIndex(tableau, position),
          });
          return;
        }
        const stack = getStackFromTableau(tableau, highlighted.position);
        if (
          key.upArrow &&
          cardHasFaceUpCardsBelowIt(stack, highlighted.index)
        ) {
          setHighlighted({
            area: "tableau",
            position: highlighted.position,
            index: highlighted.index - 1,
          });
        } else if (
          key.downArrow &&
          cardHasFaceUpCardsAboveIt(stack, highlighted.index)
        ) {
          setHighlighted({
            area: "tableau",
            position: highlighted.position,
            index: highlighted.index + 1,
          });
        } else if (key.upArrow || key.downArrow) {
          if (highlighted.position === 0)
            setHighlighted({ area: "stock", position: 0 });
          else if (highlighted.position === 1)
            setHighlighted({ area: "waste", position: 0 });
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
  });
};

export const useStockControls = () => {
  const [stock, updateStock] = useRecoilState(cardAreaState("stock"));
  const [waste, updateWaste] = useRecoilState(cardAreaState("waste"));
  const highlighted = useRecoilValue(highlightedAreaState);

  useInput((input) => {
    if (input !== " " || highlighted.area !== "stock") return;
    if (stock.length) {
      const newStock = clone(stock);
      const newWaste = clone(waste);
      const card = newStock.pop();
      card.highlighted = false;
      updateStock(newStock);
      updateWaste(
        newWaste
          .concat(card)
          .map((card) => ({ ...card, faceUp: true, selected: false }))
      );
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
  const highlightedArea = useRecoilValue(highlightedAreaState);
  const [highlightedCard, updateHighlightedCard] = useRecoilState(
    highlightedCardState
  );
  const [highlightedStack, updateHighlightedStack] = useRecoilState(
    cardStackState(highlightedArea)
  );
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const [selectedStack, updateSelectedStack] = useRecoilState(
    cardStackState(selectedCard)
  );
  const [foundation, updateFoundation] = useRecoilState(
    cardAreaState("foundation")
  );
  const moveCard = () => {
    const selectedCardIndex = selectedStack.indexOf(selectedCard);
    const originStack = clone(selectedStack);
    const remainingStack = originStack.slice(0, selectedCardIndex);
    const movingStack = originStack.slice(selectedCardIndex);
    updateSelectedStack(
      remainingStack.map((card) => ({ ...card, selected: false }))
    );

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
  useInput((input) => {
    if (input !== " " || highlightedArea.area === "stock") return;

    // Move card to empty space
    if (selectedCard && !highlightedCard) {
      // Move king to empty tableau space
      if (
        highlightedArea.area === "tableau" &&
        selectedCard.rank === Rank.King
      ) {
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
          ...newStack.pop(),
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
    else if (
      highlightedArea.area === "tableau" &&
      isCardMovableToTableau(highlightedCard, selectedCard)
    ) {
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
