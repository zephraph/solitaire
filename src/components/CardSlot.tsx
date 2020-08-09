import React, { FC } from "react";
import { Box, Spacer } from "ink";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

const CardSlot: FC = () => {
	return (
		<Box
			borderStyle="single"
			width={CARD_WIDTH}
			height={CARD_HEIGHT}
			flexDirection="column"
			borderColor="gray"
		></Box>
	);
};

export default CardSlot;
