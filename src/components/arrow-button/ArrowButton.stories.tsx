import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const [isOpen, setIsOpen] = useState<boolean>(false);

function toggleOpen() {
	setIsOpen(prevState => !prevState);
}

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton toggleOpenFunc={toggleOpen} openState={isOpen}/>
			</>
		);
	},
};
