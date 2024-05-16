import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { useEffect, useRef, useState } from 'react';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontSizeOptions,
	defaultArticleState,
	fontFamilyOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export interface IOptions {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

interface PropsArticleParamsForm {
	setPageState: React.Dispatch<React.SetStateAction<IOptions>>;
}

export const ArticleParamsForm = ({ setPageState }: PropsArticleParamsForm) => {
	const [formState, setFormState] = useState<IOptions>(defaultArticleState);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	function toggleOpen() {
		setIsOpen((prevState) => !prevState);
	}

	function setDefaultOptions() {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	}

	function confirmOptions(event: React.SyntheticEvent) {
		event.preventDefault();
		setPageState(formState);
	}

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		if (!isOpen) {
			return () => {
				window.addEventListener('mousedown', handleClick);
			};
		}

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, []);

	return (
		<div ref={rootRef}>
			<ArrowButton toggleOpenFunc={toggleOpen} openState={isOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={confirmOptions}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: selected,
							}))
						}></Select>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='px'
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: selected,
							}))
						}></RadioGroup>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selected,
							}))
						}></Select>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selected,
							}))
						}></Select>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selected,
							}))
						}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={setDefaultOptions} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
